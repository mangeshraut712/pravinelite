CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  goal TEXT NOT NULL,
  mode TEXT NOT NULL,
  slot_date DATE NOT NULL,
  slot_time TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Public can insert bookings (lead capture, no auth required)
CREATE POLICY "Anyone can create a booking"
  ON public.bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- No public select/update/delete — only via admin/service role

CREATE INDEX bookings_slot_idx ON public.bookings (slot_date, slot_time);

CREATE TABLE public.calculator_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  age INT,
  gender TEXT,
  height_cm NUMERIC,
  weight_kg NUMERIC,
  activity TEXT,
  goal TEXT,
  bmi NUMERIC,
  tdee INT,
  recommended_program TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.calculator_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit calc lead"
  ON public.calculator_leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);