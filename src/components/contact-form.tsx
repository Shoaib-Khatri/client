"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

interface ContactFormProps {
  carId?: string;
  carName?: string;
}

export function ContactForm({ carId, carName }: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("idle");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      carId,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send");

      setStatus("success");
      e.currentTarget.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h3 className="text-xl font-bold mb-4">
        {carName ? `Inquire about ${carName}` : "Contact Us"}
      </h3>

      {status === "success" ? (
        <div className="bg-green-50 text-green-700 p-4 rounded-lg">
          Message sent successfully! We'll get back to you shortly.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              name="name"
              type="text"
              required
              className="w-full border-gray-300 rounded-md shadow-sm p-3 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full border-gray-300 rounded-md shadow-sm p-3 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              required
              rows={4}
              className="w-full border-gray-300 rounded-md shadow-sm p-3 border"
              placeholder="I'm interested in this car..."
            />
          </div>

          {status === "error" && (
            <div className="text-red-500 text-sm">
              Failed to send message. Please try again.
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition flex items-center justify-center bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
