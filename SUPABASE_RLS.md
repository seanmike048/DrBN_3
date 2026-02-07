# Supabase RLS Policies for Profiles

To ensure authenticated users can save their profiles, you must enable Row Level Security (RLS) on the `profiles` table and add the following policies.

## 1. Enable RLS
Run this in the Supabase SQL Editor:
```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
```

## 2. Policies

### Allow users to insert/update their own profile
You can create separate policies or a combined one for upsert.

```sql
-- Allow insert if ID matches user ID
CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK ( auth.uid() = id );

-- Allow update if ID matches user ID
CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING ( auth.uid() = id );

-- Allow select if ID matches user ID
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING ( auth.uid() = id );
```

## 3. Storage Policies (If needed for photos)
If you use storage for profile photos:
```sql
CREATE POLICY "Give users access to own folder 1oj01l_0"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profile_photos' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Give users access to own folder 1oj01l_1"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'profile_photos' AND (storage.foldername(name))[1] = auth.uid()::text);
```
