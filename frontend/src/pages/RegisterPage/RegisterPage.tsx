import Register from '@/components/Register/Register';
import { useRegister } from '@/components/Register/useRegister';

function RegisterPage() {
  const { handleSubmit, loading } = useRegister();
  return <Register submit={handleSubmit} loading={loading} />;
}

export default RegisterPage;
