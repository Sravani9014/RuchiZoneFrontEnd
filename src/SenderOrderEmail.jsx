import emailjs from "@emailjs/browser";



function SenderOrderEmail({ cartItems, netAmount, tax, totalAmount, customerEmail }) {

  const sendEmail = () => {

    let templateParams = {
      orders: cartItems.map(item => ({
        name: item.name,
        units: item.quantity,
        price: item.price,
         img: item.img

         
      })),

      cost: {
        shipping: totalAmount.toFixed(2),
        tax: tax.toFixed(2),
        total: netAmount.toFixed(2),
      },
      

      email: customerEmail,
      order_id: Date.now()
      
    };

    emailjs.send(
      "service_yozy7vb",
      "template_bn79673",
      templateParams,
      "2ElnIprzoYEpfP10L"
    )
    .then((response) => {
      alert("Email sent successfully");
    })
    .catch((err) => {
      alert("Email failed!");
      console.log("Error:", err);
    });
  };

  return (
    <button onClick={sendEmail}>Send order email</button>
  );
}

export default SenderOrderEmail;
