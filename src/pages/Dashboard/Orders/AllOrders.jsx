import React, { useEffect, useMemo, useState } from "react";
import { Table, Tag, message, Input, Button, Space, Select, DatePicker, Drawer, Card, Row, Col, InputNumber, Popconfirm, Modal } from "antd";
import axios from "axios";
import DownloadCSV from "../../../components/DownloadCSV";
import { DownloadOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { Option } = Select;
const API = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:8000";

export default function AllOrders() {
  const [ordersRaw, setOrdersRaw] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [posOpen, setPosOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [posCart, setPosCart] = useState([]);
  const [productSearch, setProductSearch] = useState("");

  const fetchOrders = async () => {
    try { setLoading(true); const res = await axios.get(`${API}/api/get-orders`); setOrdersRaw(res.data?.orders || res.data || []); }
    catch { message.error("Failed to load orders"); }
    finally { setLoading(false); }
  };

  const fetchProducts = async () => {
    try { setProductsLoading(true); const res = await axios.get(`${API}/api/products/products`); setProducts(res.data?.products || res.data || []); }
    catch { message.error("Failed to load products"); }
    finally { setProductsLoading(false); }
  };

  useEffect(() => { fetchOrders(); fetchProducts(); }, []);

  const orders = useMemo(() =>
    ordersRaw.map(o => ({ key: o._id, _id: o._id, customerName: o.fullName||"Guest", email: o.email||"", amount: o.totalAmount||0, itemsCount: o.items?.length||0, status: o.paymentStatus||"unknown", date: new Date(o.createdAt||Date.now()), raw:o })), 
    [ordersRaw]
  );

  const visibleOrders = useMemo(() => orders.filter(o => {
    if (searchText && ![o._id,o.customerName,o.email].some(v=>v?.toLowerCase().includes(searchText.toLowerCase()))) return false;
    if (statusFilter && o.status!==statusFilter) return false;
    if(dateRange?.length===2){const [start,end]=dateRange; if(o.date<start.toDate?.()||o.date>end.toDate?.()) return false;}
    return true;
  }), [orders, searchText, statusFilter, dateRange]);

  const columns = [
    { title:"Order ID", dataIndex:"_id", render:id=><code>{id}</code>, sorter:(a,b)=>a._id.localeCompare(b._id), width:150 },
    { title:"Customer", dataIndex:"customerName", render:(name,r)=><div><b>{name}</b><div style={{fontSize:12,color:"#666"}}>{r.email}</div></div>, width:200 },
    { title:"Amount", dataIndex:"amount", sorter:(a,b)=>a.amount-b.amount, render:a=>`${Number(a).toFixed(2)}`, width:100 },
    { title:"Items", dataIndex:"itemsCount", sorter:(a,b)=>a.itemsCount-b.itemsCount, width:80 },
    { title:"Status", dataIndex:"status", filters:[{text:"paid",value:"paid"},{text:"pending",value:"pending"},{text:"failed",value:"failed"}], onFilter:(v,r)=>r.status===v, render:(s,r)=><Space><Tag color={s==="paid"?"green":s==="failed"?"red":"orange"}>{s}</Tag><StatusDropdown orderId={r._id} current={s} onUpdate={fetchOrders}/></Space>, width:180 },
    { title:"Date", dataIndex:"date", sorter:(a,b)=>a.date-b.date, render:d=>d.toLocaleString(), width:150 }
  ];

  const expandedRowRender = r => (
    <Row gutter={16}>
      <Col xs={24} md={12}>
        <h4>Items ({r.raw.items?.length || 0})</h4>
<Table
  size="small"
  pagination={false}
  dataSource={r.raw.items || []}
  rowKey={i => i.productId || i._id || Math.random()}
  columns={[
    {
      title: "Product",
      render: i => (
        <Space align="center">
          {i.image && (
            <img
              src={i.image}
              alt={i.name}
              style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 4 }}
            />
          )}
          <span>{i.name}</span>
        </Space>
      ),
      ellipsis: true, 
    },
    { title: "Qty", dataIndex: "qty", width: 60 },
    { title: "Price", dataIndex: "price", render: p => `${p.toFixed(2)}`, width: 80 },
    {
      title: "Total",
      render: i => `${((i.qty || 0) * (i.price || 0)).toFixed(2)}`,
      width: 100,
    },
  ]}
  scroll={{ x: "max-content" }} 
/>

      </Col>
      <Col xs={24} md={12}>
        <Card title="Customer">
          <div><b>Name:</b> {r.raw.fullName}</div>
          <div><b>Email:</b> {r.raw.email}</div>
          {r.raw.phone && <div><b>Phone:</b>{r.raw.phone}</div>}
          {r.raw.address && <div><b>Address:</b>{r.raw.address}, {r.raw.city}</div>}
          <div style={{marginTop:12}}><b>Payment:</b> {r.raw.paymentMethod}</div>
          <Popconfirm title="Delete this order?" onConfirm={async()=>{try{await axios.delete(`${API}/api/delete-orders/${r._id}`);message.success("Deleted");fetchOrders();}catch{message.error("Failed")}}}>
            <Button danger style={{marginTop:12}}>Delete Order</Button>
          </Popconfirm>
        </Card>
      </Col>
    </Row>
  );

  return (
  <div style={{ padding: 16 }}>
  <h2>📦 Orders</h2>

  {/* Filter & Action Section */}
  <Card
    style={{ marginBottom: 16, borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
    bodyStyle={{ padding: 16 }}
  >
    <Row gutter={[12, 12]} align="middle">
      <Col xs={24} sm={12} md={6}>
        <Input
          placeholder="Search..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          prefix={<SearchOutlined />}
          allowClear
        />
      </Col>
      <Col xs={24} sm={12} md={4}>
        <Select
          placeholder="Filter status"
          allowClear
          style={{ width: "100%" }}
          onChange={setStatusFilter}
        >
          <Option value="paid">Paid</Option>
          <Option value="pending">Pending</Option>
          <Option value="failed">Failed</Option>
        </Select>
      </Col>
      <Col xs={24} sm={24} md={6}>
        <RangePicker style={{ width: "100%" }} onChange={setDateRange} />
      </Col>
      <Col xs={24} sm={24} md={8}>
        <Space wrap>
          <DownloadCSV data={orders} fileName="orders.csv">
            <Button type="primary"><DownloadOutlined />Download CSV</Button>
             </DownloadCSV>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setPosOpen(true)}>
            Open POS
          </Button>
          <Button onClick={fetchOrders}>Refresh</Button>
        </Space>
      </Col>
    </Row>
  </Card>
 <div
  style={{
    maxHeight: "65vh",      
    overflowY: "auto",      
    overflowX: "auto",      
    borderRadius: 8,
    border: "1px solid #eee",
    padding: 4
  }}
>
  <Table
    columns={columns}
    dataSource={visibleOrders}
    loading={loading}
    expandable={{ expandedRowRender }}
    pagination={{ pageSize: 10 }}
    rowKey={r => r._id}
    scroll={{ x: "max-content" }}  
  />
</div>



  {/* POS Drawer */}
  <POSDrawer
    open={posOpen}
    onClose={() => setPosOpen(false)}
    products={products}
    productsLoading={productsLoading}
    productSearch={productSearch}
    setProductSearch={setProductSearch}
    cart={posCart}
    setCart={setPosCart}
    onOrderComplete={() => {
      setPosCart([]);
      setPosOpen(false);
      fetchOrders();
    }}
  />
</div>

  );
}

// --- Status Dropdown ---
const StatusDropdown = ({orderId,current,onUpdate}) => {
  const [loading,setLoading] = useState(false);
  const updateStatus = async val=>{try{setLoading(true);await axios.put(`${API}/api/update-order/${orderId}`,{paymentStatus:val});message.success("Updated");onUpdate?.();}catch{message.error("Failed")}finally{setLoading(false)}}
  return <Select size="small" value={current} loading={loading} onChange={val=>Modal.confirm({title:"Change status",content:`Change to "${val}"?`,onOk:()=>updateStatus(val)})} style={{width:140}}>
    <Option value="paid">paid</Option><Option value="pending">pending</Option><Option value="failed">failed</Option>
  </Select>
}

// --- POS Drawer ---
const POSDrawer = ({open,onClose,products=[],productsLoading,productSearch,setProductSearch,cart,setCart,onOrderComplete})=>{
  const addToCart=p=>{const ex=cart.find(c=>c._id===p._id);ex?setCart(cart.map(c=>c._id===ex._id?{...c,qty:c.qty+1}:c)):setCart([...cart,{_id:p._id,productId:p._id,name:p.title||p.name,price:p.price||0,qty:1,image:p.image||p.images?.[0]}])}
  const updateQty=(id,qty)=>setCart(cart.map(c=>c._id===id?{...c,qty}:c))
  const removeFromCart=id=>setCart(cart.filter(c=>c._id!==id))
  const subtotal=cart.reduce((s,i)=>s+(i.price||0)*(i.qty||1),0)
  const tax=+(subtotal*0.05).toFixed(2)
  const total=+(subtotal+tax).toFixed(2)
  const checkoutPOS=async()=>{if(!cart.length)return message.warning("Cart empty");try{await axios.post(`${API}/api/orders/create-pos-order`,{items:cart.map(c=>({productId:c.productId,name:c.name,qty:c.qty,price:c.price,image:c.image})),amount:total,paymentStatus:"paid",paymentMethod:"pos"});message.success("POS order created");onOrderComplete?.()}catch{message.error("POS checkout failed")}}
  return(
    <Drawer title="POS" width={900} open={open} onClose={onClose}>
      <Row gutter={12}>
        <Col xs={24} md={14}>
          <Input placeholder="Search product..." value={productSearch} onChange={e=>setProductSearch(e.target.value)} style={{marginBottom:12}}/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:12}}>
            {products.filter(p=>!productSearch||`${p.title||p.name}`.toLowerCase().includes(productSearch.toLowerCase())).map(p=>(
              <Card key={p._id} hoverable onClick={()=>addToCart(p)}>
                <div style={{display:"flex",gap:12}}>{p.image&&<img src={p.image} style={{width:80,height:80,objectFit:"cover"}}/>}<div><b>{p.title||p.name}</b><div style={{color:"#666"}}>{p.price??0}</div></div></div>
              </Card>
            ))}
          </div>
        </Col>
        <Col xs={24} md={10}>
          <h3>Cart</h3>
          {cart.length===0?<div style={{color:"#777"}}>No items</div>:cart.map(c=>(
            <div key={c._id} style={{display:"flex",gap:10,alignItems:"center",marginBottom:12,borderBottom:"1px dashed #eee",paddingBottom:8}}>
              {c.image&&<img src={c.image} style={{width:56,height:56,objectFit:"cover"}}/>}
              <div style={{flex:1}}><b>{c.name}</b><div style={{color:"#555"}}>{c.price.toFixed(2)}</div></div>
              <InputNumber min={1} value={c.qty} onChange={val=>updateQty(c._id,val)}/>
              <div style={{width:90,textAlign:"right",fontWeight:700}}>{(c.qty*c.price).toFixed(2)}</div>
              <Button danger onClick={()=>removeFromCart(c._id)}>Remove</Button>
            </div>
          ))}
          <div style={{marginTop:20}}>
            <div style={{display:"flex",justifyContent:"space-between"}}><div>Subtotal</div><div>{subtotal.toFixed(2)}</div></div>
            <div style={{display:"flex",justifyContent:"space-between"}}><div>Tax (5%)</div><div>{tax.toFixed(2)}</div></div>
            <div style={{display:"flex",justifyContent:"space-between",fontWeight:800,fontSize:18}}><div>Total</div><div>{total.toFixed(2)}</div></div>
            <Space style={{marginTop:12}}><Button type="primary" onClick={checkoutPOS}>Pay</Button><Button onClick={()=>{setCart([]);message.info("Cart cleared")}}>Clear</Button></Space>
          </div>
        </Col>
      </Row>
    </Drawer>
  )
}
