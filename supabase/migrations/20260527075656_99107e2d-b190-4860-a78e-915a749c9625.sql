-- Add explicit deny-all SELECT policies to make intent clear and prevent accidental exposure
-- of sensitive lead/booking data via the public Data API. Reads remain available to
-- service_role (which bypasses RLS) for any future admin/server-side use.

CREATE POLICY "Deny public reads of bookings"
  ON public.bookings
  FOR SELECT
  TO anon, authenticated
  USING (false);

CREATE POLICY "Deny public reads of calculator leads"
  ON public.calculator_leads
  FOR SELECT
  TO anon, authenticated
  USING (false);