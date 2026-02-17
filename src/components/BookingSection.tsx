import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  serviceType: z.string().min(1, "Please select a service"),
  issue: z.string().trim().min(5, "Describe the issue briefly").max(500),
  address: z.string().trim().min(5, "Address is required").max(300),
  preferredTime: z.string().min(1, "Select preferred time"),
});

type BookingData = z.infer<typeof bookingSchema>;

const Field = ({ label, name, value, onChange, error, placeholder, type = "text" }: any) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-foreground">{label}</label>
    <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
      className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent" />
    {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
  </div>
);

const BookingSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof BookingData, string>>>({});
  const [form, setForm] = useState<BookingData>({
    name: "", phone: "", serviceType: "", issue: "", address: "", preferredTime: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = bookingSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => { fieldErrors[err.path[0] as string] = err.message; });
      setErrors(fieldErrors);
      return;
    }
    setSubmitted(true);
  };

  return (
    <section id="booking" className="bg-secondary py-16 md:py-20 scroll-mt-20">
      <div className="container max-w-2xl">
        <div className="text-center">
          <h2 className="section-heading">Book a Repair</h2>
          <p className="section-subheading">Fill in your details and we'll arrange a free pickup.</p>
        </div>

        <div className="mt-8 service-card">
          {submitted ? (
            <div className="py-8 text-center">
              <CheckCircle2 className="mx-auto h-16 w-16 text-success" />
              <h4 className="mt-4 text-xl font-bold text-foreground">Booking Confirmed!</h4>
              <p className="mt-2 text-muted-foreground">Thank you! Our team will call you shortly to confirm your appointment.</p>
              <button onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", serviceType: "", issue: "", address: "", preferredTime: "" }); }}
                className="btn-cta mt-6">Book Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder="Your name" />
                <Field label="Phone Number" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="10-digit mobile" type="tel" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Service Type</label>
                  <select name="serviceType" value={form.serviceType} onChange={handleChange}
                    className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent">
                    <option value="">Select service</option>
                    <option>Laptop Repair</option>
                    <option>AC Repair</option>
                    <option>AC Installation</option>
                    <option>AC Service/Maintenance</option>
                  </select>
                  {errors.serviceType && <p className="mt-1 text-xs text-destructive">{errors.serviceType}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Preferred Time</label>
                  <select name="preferredTime" value={form.preferredTime} onChange={handleChange}
                    className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent">
                    <option value="">Select time slot</option>
                    <option>Morning (9AM–12PM)</option>
                    <option>Afternoon (12PM–3PM)</option>
                    <option>Evening (3PM–6PM)</option>
                    <option>Late Evening (6PM–9PM)</option>
                  </select>
                  {errors.preferredTime && <p className="mt-1 text-xs text-destructive">{errors.preferredTime}</p>}
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Issue Description</label>
                <textarea name="issue" value={form.issue} onChange={handleChange} rows={3} placeholder="Describe the issue..."
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent resize-none" />
                {errors.issue && <p className="mt-1 text-xs text-destructive">{errors.issue}</p>}
              </div>
              <Field label="Pickup Address" name="address" value={form.address} onChange={handleChange} error={errors.address} placeholder="Your full address" />
              <button type="submit" className="btn-cta w-full text-base">Book Free Pickup</button>
              <p className="text-center text-xs text-muted-foreground">Inspection fee: ₹350 (adjustable against repair cost) • No Fix No Fee</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
