import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import IconGoogle from "./IconGoogle"
import { useAuthStore } from "@/stores/useAuthStore"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import Loading from "./Loading"
import z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'

const signUpSchema = z.object({
  fullName: z.string().min(1, { message: 'Họ và tên hoặc tên doanh nghiệp không được bỏ trống' }),
  username: z.string().min(1, { message: 'Tên đăng nhập không được bỏ trống' }),
  email: z.email({ message: 'Định dạng email không đúng' }),
  password: z.string().min(6, { message: 'Mật khẩu ít nhất 6 kí tự' }),
})

export function SignupForm({
  ...props
}) {
  const { signUp, authLoading } = useAuthStore();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'candidate'
    }
  });

  const handleSignUp = async (data) => {
    const { fullName, username, email, password, confirmPassword, role } = data;

    if(password !== confirmPassword) {
      toast.error('Mật khẩu nhập lại không đúng');
      return
    }
    
    const success = await signUp(fullName, username, email, password, role);
    if (success) {
      navigate('/signin')
    }
  }

  const loginGoogle = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`
  }

  if (authLoading) {
    return <Loading />
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className='text-center font-bold'>Đăng ký tài khoản</CardTitle>
        <CardDescription className='text-center'>
          Chào mừng bạn đến với việc làm 24h 👋
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="fullName">Họ và tên</FieldLabel>
              <Input {...register('fullName')} id="fullName" type="text" placeholder="Nguyễn Văn A" required />
              {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
            </Field>
            <Field>
              <FieldLabel htmlFor="username">Tên đăng nhập</FieldLabel>
              <Input {...register('username')} id="username" type="text" placeholder="nguyenvana123" required />
              {errors.username && <p className="text-red-500">{errors.username.message}</p>}
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input {...register('email')} id="email" type="email" placeholder="nguyenvana123@gmail.com" required />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
              <Input {...register('password')} id="password" type="password" required />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              <FieldDescription>
                Mật khẩu có độ dài tối thiểu 6 ký tự
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Nhập lại mật khẩu
              </FieldLabel>
              <Input {...register('confirmPassword')} id="confirmPassword" type="password" required />
            </Field>
            <Field>
              <FieldLabel>
                Loại tài khoản
              </FieldLabel>
              <NativeSelect {...register('role')}>
                <NativeSelectOption value="candidate">Ứng viên</NativeSelectOption>
                <NativeSelectOption value="company">Nhà tuyển dụng</NativeSelectOption>
              </NativeSelect>
            </Field>
            <FieldGroup>
              <Field>
                <Button variant="ghost" className='bg-green-800 text-white cursor-pointer' type="submit">Tạo tài khoản</Button>
                <Button onClick={loginGoogle} variant="outline" type="button">
                  <IconGoogle />Tiếp tục với Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Bạn đã có tài khoản? <a href="/signin">Đăng nhập</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
