import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../assets/logo.png"; // path to your logo

const InvoiceDownload = ({ order }) => {
  const handleDownload = async () => {
    const doc = new jsPDF();

    // Load image as base64
    const loadImageAsBase64 = (src) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL("image/png"));
        };
        img.onerror = reject;
        img.src = src;
      });

    try {
      const logoBase64 = await loadImageAsBase64(logo);
      doc.addImage(logoBase64, "PNG", 80, 10, 50, 15);
    } catch (err) {
      console.warn("Logo failed to load, skipping image.");
    }

    // Title
    doc.setFontSize(18);
    doc.text("Invoice", 105, 40, null, null, "center");

    // Order Info
    doc.setFontSize(12);
    doc.text(`Order ID: ${order._id}`, 14, 50);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 14, 58);

    doc.text(
      `Customer: ${
        order.firstName && order.lastName
          ? `${order.firstName} ${order.lastName}`
          : order.email
      }`,
      14,
      66
    );

    doc.text(`Email: ${order.email}`, 14, 74);

    // Address
    const address = order.shippingInfo;
    doc.text(`Address: ${address.address}, ${address.city}`, 14, 82);
    doc.text(`Postcode: ${address.postcode}`, 14, 90);
    doc.text(`Phone: ${address.phone}`, 14, 98);

    // Items table
    const tableData = order.cartItems.map((item) => [
      item.name,
      item.selectedSize,
      item.selectedColor,
      item.quantity,
      `$${item.price.toFixed(2)}`,
      `$${(item.price * item.quantity).toFixed(2)}`,
    ]);

    autoTable(doc, {
      head: [["Item", "Size", "Color", "Qty", "Price", "Total"]],
      body: tableData,
      startY: 105,
    });

    // Total
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.text(`Total (with tax): $${order.totalAmount?.toFixed(2)}`, 14, finalY);

    // Save
    doc.save(`invoice_${order._id}.pdf`);
  };

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
    >
      Download Invoice (PDF)
    </button>
  );
};

export default InvoiceDownload;
