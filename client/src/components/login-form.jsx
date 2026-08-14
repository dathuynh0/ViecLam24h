import { cn } from "@/lib/utils"
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
import IconGoogle from "./IconGoogle"
import { useAuthStore } from "@/stores/useAuthStore"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import Loading from "./Loading"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const signInSchema = z.object({
  username: z.string().min(1, { message: 'Thiếu tên đăng nhập' }),
  password: z.string().min(6, { message: 'Mật khẩu tối thiểu 6 kí tự' })
}) 

export function LoginForm({
  className,
  ...props
}) {
  const { signIn, authLoading } = useAuthStore();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const navigate = useNavigate();

  const handleSignIn = async (data) => {
    const { username, password } = data;
    if (!username || !password) return;

    
    const success = await signIn(username, password);
    if (success) {
      navigate('/');
    }
};

  const loginGoogle = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`
  }

  if (authLoading) {
    return <Loading />
  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='font-bold'>Đăng nhập</CardTitle>
          <CardDescription>
            Chào mừng bạn trở lại 👋
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleSignIn)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Tên đăng nhập</FieldLabel>
                <Input {...register('username', { required: true })} id="username" type="text" placeholder="nguyenvana123" required />
                {errors.username && <p className="text-red-500">{errors.username.message}</p>}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Quên mật khẩu
                  </a>
                </div>
                <Input {...register('password', { required: true })} id="password" type="password" required />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </Field>
              <Field> 
                <Button variant="ghost" className='text-white bg-green-800' type="submit">Đăng nhập</Button>
                <Button onClick={loginGoogle} variant="outline" type="button">
                  <IconGoogle/>Tiếp tục với Google
                </Button>
                <FieldDescription className="text-center">
                  Bạn chưa có mật khẩu? <a href="/signup">Đăng ký</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
