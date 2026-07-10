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

export function LoginForm({
  className,
  ...props
}) {
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
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="emaEmail">Tên đăng nhập hoặc email</FieldLabel>
                <Input id="email" type="email" placeholder="nguyenvana123" required />
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
                <Input id="password" type="password" required />
              </Field>
              <Field>
                <Button variant="ghost" className='text-white bg-green-800' type="submit">Đăng nhập</Button>
                <Button variant="outline" type="button">
                  <IconGoogle/>Đăng nhập với Google
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
