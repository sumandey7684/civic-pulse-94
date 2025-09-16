// Frontend API for OTP requests and verification
export async function requestOtp(email: string) {
  const res = await fetch('http://localhost:4000/api/request-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return res.json();
}

export async function verifyOtp(email: string, otp: string) {
  const res = await fetch('http://localhost:4000/api/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
  });
  return res.json();
}
