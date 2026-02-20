import { useState, useMemo } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { SERVICE_TYPES, AC_BRANDS, FRIDGE_BRANDS, WASHING_MACHINE_BRANDS } from "@/lib/constants";

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  serviceType: z.string().min(1, "Please select a service"),
  brand: z.string().min(1, "Please select a brand"),
  issue: z.string().trim().min(5, "Describe the issue briefly").max(500),
  address: z.string().trim().min(5, "Address is required").max(300),
  preferredTime: z.string().min(1, "Select preferred time"),
});

type BookingData = z.infer<typeof bookingSchema>;

const BookingForm = () => {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof BookingData, string>>>({});
  const [form, setForm] = useState<BookingData>({
    name: "", phone: "", serviceType: "", brand: "", issue: "", address: "", preferredTime: "",
  });

  const availableBrands = useMemo(() => {
    const service = SERVICE_TYPES.find(s => s.label === form.serviceType);
    if (!service) return [];
    if (service.category === "AC") return AC_BRANDS;
    if (service.category === "Fridge") return FRIDGE_BRANDS;
    if (service.category === "Washing Machine") return WASHING_MACHINE_BRANDS;
    return [];
  }, [form.serviceType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => {
      const next = { ...prev, [name]: value };
      if (name === "serviceType") {
        next.brand = ""; // Reset brand when service changes
      }
      return next;
    });
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = bookingSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => { fieldErrors[err.path[0] as string] = err.message; });
      setErrors(fieldErrors);
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Replace YOUR_FORM_ID with your actual Formspree ID
      const response = await fetch("https://formspree.io/f/mgollvyl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4" onClick={() => { setOpen(false); setSubmitted(false); }}>
      <div className="w-full max-w-lg rounded-2xl bg-card p-6 md:p-8 max-h-[90vh] overflow-y-auto" style={{ boxShadow: "var(--card-shadow-hover)" }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">Book a Repair</h3>
          <button onClick={() => { setOpen(false); setSubmitted(false); }} className="rounded-lg p-1 text-muted-foreground hover:bg-muted" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="mx-auto h-16 w-16 text-success" />
            <h4 className="mt-4 text-xl font-bold text-foreground">Booking Confirmed!</h4>
            <p className="mt-2 text-muted-foreground">Thank you! Our team will call you shortly to confirm your appointment.</p>
            <button onClick={() => { setOpen(false); setSubmitted(false); setForm({ name: "", phone: "", serviceType: "", brand: "", issue: "", address: "", preferredTime: "" }); }}
              className="btn-cta mt-6">Done</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <Field label="Full Name" name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder="Your name" />
            <Field label="Phone Number" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="10-digit mobile number" type="tel" />
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Service Type</label>
                <select name="serviceType" value={form.serviceType} onChange={handleChange}
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent">
                  <option value="">Select service</option>
                  {SERVICE_TYPES.map(s => <option key={s.label} value={s.label}>{s.label}</option>)}
                </select>
                {errors.serviceType && <p className="mt-1 text-xs text-destructive">{errors.serviceType}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Brand</label>
                <select name="brand" value={form.brand} onChange={handleChange} disabled={!form.serviceType}
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent disabled:opacity-50">
                  <option value="">Select brand</option>
                  {availableBrands.map(b => <option key={b} value={b}>{b}</option>)}
                  <option value="Other">Other</option>
                </select>
                {errors.brand && <p className="mt-1 text-xs text-destructive">{errors.brand}</p>}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Issue Description</label>
              <textarea name="issue" value={form.issue} onChange={handleChange} rows={3} placeholder="Describe the issue..."
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent resize-none" />
              {errors.issue && <p className="mt-1 text-xs text-destructive">{errors.issue}</p>}
            </div>
            <Field label="Address" name="address" value={form.address} onChange={handleChange} error={errors.address} placeholder="Your pickup address" />
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
            <button type="submit" disabled={isSubmitting} className="btn-cta w-full text-base mt-2">
              {isSubmitting ? "Sending..." : "Book Free Pickup"}
            </button>
            <p className="text-center text-xs text-muted-foreground">Inspection fee: ₹350 (adjustable against repair cost)</p>
          </form>
        )}
      </div>
    </div>
  );
};

const Field = ({ label, name, value, onChange, error, placeholder, type = "text" }: any) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-foreground">{label}</label>
    <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
      className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent" />
    {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
  </div>
);

// Export a component that renders the button + modal
export const BookingTrigger = () => {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof BookingData, string>>>({});
  const [form, setForm] = useState<BookingData>({
    name: "", phone: "", serviceType: "", brand: "", issue: "", address: "", preferredTime: "",
  });

  const availableBrands = useMemo(() => {
    const service = SERVICE_TYPES.find(s => s.label === form.serviceType);
    if (!service) return [];
    if (service.category === "AC") return AC_BRANDS;
    if (service.category === "Fridge") return FRIDGE_BRANDS;
    if (service.category === "Washing Machine") return WASHING_MACHINE_BRANDS;
    return [];
  }, [form.serviceType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => {
      const next = { ...prev, [name]: value };
      if (name === "serviceType") {
        next.brand = "";
      }
      return next;
    });
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = bookingSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => { fieldErrors[err.path[0] as string] = err.message; });
      setErrors(fieldErrors);
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/mgollvyl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div id="booking" className="scroll-mt-24" />
      {/* Trigger handled via hash links in other components */}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4" onClick={() => { setOpen(false); setSubmitted(false); }}>
          <div className="w-full max-w-lg rounded-2xl bg-card p-6 md:p-8 max-h-[90vh] overflow-y-auto" style={{ boxShadow: "var(--card-shadow-hover)" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">Book a Repair</h3>
              <button onClick={() => { setOpen(false); setSubmitted(false); }} className="rounded-lg p-1 text-muted-foreground hover:bg-muted" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>

            {submitted ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="mx-auto h-16 w-16 text-success" />
                <h4 className="mt-4 text-xl font-bold text-foreground">Booking Confirmed!</h4>
                <p className="mt-2 text-muted-foreground">Thank you! Our team will call you shortly.</p>
                <button onClick={() => { setOpen(false); setSubmitted(false); setForm({ name: "", phone: "", serviceType: "", brand: "", issue: "", address: "", preferredTime: "" }); }}
                  className="btn-cta mt-6">Done</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <Field label="Full Name" name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder="Your name" />
                <Field label="Phone Number" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="10-digit mobile number" type="tel" />
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">Service Type</label>
                    <select name="serviceType" value={form.serviceType} onChange={handleChange}
                      className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent">
                      <option value="">Select service</option>
                      {SERVICE_TYPES.map(s => <option key={s.label} value={s.label}>{s.label}</option>)}
                    </select>
                    {errors.serviceType && <p className="mt-1 text-xs text-destructive">{errors.serviceType}</p>}
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">Brand</label>
                    <select name="brand" value={form.brand} onChange={handleChange} disabled={!form.serviceType}
                      className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent disabled:opacity-50">
                      <option value="">Select brand</option>
                      {availableBrands.map(b => <option key={b} value={b}>{b}</option>)}
                      <option value="Other">Other</option>
                    </select>
                    {errors.brand && <p className="mt-1 text-xs text-destructive">{errors.brand}</p>}
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Issue Description</label>
                  <textarea name="issue" value={form.issue} onChange={handleChange} rows={3} placeholder="Describe the issue..."
                    className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent resize-none" />
                  {errors.issue && <p className="mt-1 text-xs text-destructive">{errors.issue}</p>}
                </div>
                <Field label="Address" name="address" value={form.address} onChange={handleChange} error={errors.address} placeholder="Your pickup address" />
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
                <button type="submit" disabled={isSubmitting} className="btn-cta w-full text-base mt-2">
              {isSubmitting ? "Sending..." : "Book Free Pickup"}
            </button>
                <p className="text-center text-xs text-muted-foreground">Inspection fee: ₹350 (adjustable against repair cost)</p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BookingForm;
