DROP POLICY IF EXISTS "Anyone can create a booking" ON public.bookings;
DROP POLICY IF EXISTS "Anyone can submit calc lead" ON public.calculator_leads;

CREATE POLICY "Public can submit a booking with valid input"
  ON public.bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(name)) BETWEEN 1 AND 100
    AND length(phone) BETWEEN 7 AND 20
    AND phone ~ '^[0-9+\-\s()]+$'
    AND (email IS NULL OR (length(email) <= 254 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'))
    AND goal IN ('fat-loss','muscle-gain','pcos','diabetes','general','injury-recovery','senior')
    AND mode IN ('in-gym','at-home','online')
    AND slot_date >= CURRENT_DATE
    AND slot_date <= CURRENT_DATE + INTERVAL '90 days'
    AND length(slot_time) BETWEEN 4 AND 10
    AND (notes IS NULL OR length(notes) <= 500)
    AND status = 'pending'
  );

CREATE POLICY "Public can submit calc lead with valid input"
  ON public.calculator_leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    (age IS NULL OR (age BETWEEN 10 AND 100))
    AND (gender IS NULL OR gender IN ('male','female','other'))
    AND (height_cm IS NULL OR (height_cm BETWEEN 100 AND 250))
    AND (weight_kg IS NULL OR (weight_kg BETWEEN 25 AND 300))
    AND (activity IS NULL OR length(activity) <= 30)
    AND (goal IS NULL OR length(goal) <= 30)
    AND (bmi IS NULL OR (bmi BETWEEN 5 AND 80))
    AND (tdee IS NULL OR (tdee BETWEEN 500 AND 8000))
    AND (recommended_program IS NULL OR length(recommended_program) <= 60)
  );