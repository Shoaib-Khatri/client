import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/models/Order";

// GET: Fetch all orders (Admin)
export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}

// POST: Create a new order
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const {
      customerName,
      customerEmail,
      items,
      total,
      address,
      city,
      postalCode,
      phoneNumber,
    } = body;

    // Basic validation
    if (!customerName || !customerEmail || !items || !total) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Extract address logic (legacy support)
    let finalAddress = address || "";
    let finalCity = city || "";
    let finalPostalCode = postalCode || "";

    if (!finalAddress) {
      const addressItem = items.find((item: any) => item.isAddress);
      if (addressItem) {
        finalAddress = addressItem.address || "";
        finalCity = addressItem.city || "";
        finalPostalCode = addressItem.postalCode || "";
      }
    }

    const orderItems = items.filter((item: any) => !item.isAddress);

    const order = await Order.create({
      customerName,
      customerEmail,
      address: finalAddress,
      city: finalCity,
      postalCode: finalPostalCode,
      phoneNumber: phoneNumber || "",
      items: orderItems,
      total,
      status: "PENDING",
    });

    // Send Confirmation Email
    // Send Confirmation Email
    const { sendEmail } = await import("@/lib/email");
    try {
      await sendEmail(
        customerEmail,
        `Order Confirmation - #${order._id}`,
        `
          Hi ${customerName},

          We have received your order.

          Order ID: ${order._id}
          Total Amount: £${total}

          Items:
          ${orderItems.map((item: any) => `- ${item.reg || "Car"}: £${item.price}`).join("\n")}

          Shipping Details:
          ${finalAddress}
          ${finalCity}, ${finalPostalCode}
          ${phoneNumber ? `Phone: ${phoneNumber}` : ""}

          If you have any questions, please reply to this email.
        `,
        `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #4CAF50;">Thank You for Your Order!</h1>
                <p>Hi ${customerName},</p>
                <p>We have received your order. Here are the details:</p>
                
                <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Order Summary</h3>
                <p><strong>Order ID:</strong> ${order._id}</p>
                <p><strong>Total Amount:</strong> £${total}</p>
                
                <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Items</h3>
                <ul style="list-style: none; padding: 0;">
                    ${orderItems
                      .map((item: any) => {
                        const details = item.config
                          ? `
                            <br/>
                            <span style="color: #666; font-size: 12px;">
                              ${item.config.plateType ? `Type: ${item.config.plateType}` : ""} 
                              ${item.config.style ? `| Style: ${item.config.style}` : ""}
                              ${item.config.size ? `| Size: ${item.config.size}` : ""}
                              ${item.config.badge ? `| Badge: ${item.config.badge}` : ""}
                              ${item.config.border ? `| Border: ${item.config.border}` : ""}
                            </span>
                           `
                          : "";

                        return `
                        <li style="padding: 10px 0; border-bottom: 1px solid #f9f9f9;">
                            <strong>${item.reg || item.make + " " + item.model || "Item"}</strong> - £${item.price}
                            ${details}
                        </li>
                    `;
                      })
                      .join("")}
                </ul>

                <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Shipping Details</h3>
                <p>
                    ${finalAddress}<br>
                    ${finalCity}, ${finalPostalCode}<br>
                    ${phoneNumber ? `Phone: ${phoneNumber}` : ""}
                </p>

                <p style="margin-top: 30px; font-size: 12px; color: #888;">
                    If you have any questions, please reply to this email.
                </p>
            </div>
        `,
      );
    } catch (emailError) {
      console.error("Error sending order confirmation email:", emailError);
      // Ensure we don't block the response if email fails, just log it
    }

    return NextResponse.json(
      { message: "Order placed successfully", order },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to place order" },
      { status: 500 },
    );
  }
}
