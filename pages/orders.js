// import Layout from "@/components/Layout";
// import {useEffect, useState} from "react";
// import axios from "axios";

// export default function OrdersPage() {
//   const [orders,setOrders] = useState([]);
//   useEffect(() => {
//     axios.get('/api/orders').then(response => {
//       setOrders(response.data);
//     });
//   }, []);
//   return (
//     <Layout>
//       <h1>Orders</h1>
//       <table className="basic">
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Paid</th>
//             <th>Recipient</th>
//             <th>Products</th>
//           </tr>
//         </thead>
//         <tbody>
//         {orders.length > 0 && orders.map(order => (
//           <tr key={order._id}>
//             <td>{(new Date(order.createdAt)).toLocaleString()}
//             </td>
//             <td className={order.paid ? 'text-green-600' : 'text-red-600'}>
//               {order.paid ? 'YES' : 'NO'}
//             </td>
//             <td>
//               {order.name} {order.email}<br />
//               {order.city} {order.postalCode} {order.country}<br />
//               {order.streetAddress}
//             </td>
//             <td>
//               {order.line_items.map(l => (
//                 <>
//                   {l.price_data?.product_data.name} x
//                   {l.quantity}<br />
//                 </>
//               ))}
//             </td>
//           </tr>
//         ))}
//         </tbody>
//       </table>
//     </Layout>
//   );
// }
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null); // To store error state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load orders. Please try again later.');
        alert('Failed to load orders. Please try again later.'); // Show alert on error
      }
    };

    fetchOrders();
  }, []);

  return (
    <Layout>
      <h1>Orders</h1>
      {error && <p className="text-red-600">{error}</p>} {/* Show error message */}
      <table className="basic">
        <thead>
          <tr>
            <th>Date</th>
            <th>Paid</th>
            <th>Recipient</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td className={order.paid ? 'text-green-600' : 'text-red-600'}>
                  {order.paid ? 'YES' : 'NO'}
                </td>
                <td>
                  {order.name} {order.email}
                  <br />
                  {order.city} {order.postalCode} {order.country}
                  <br />
                  {order.streetAddress}
                </td>
                <td>
                  {order.line_items.map((l) => (
                    <>
                      {l.price_data?.product_data.name} x {l.quantity}
                      <br />
                    </>
                  ))}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
}
