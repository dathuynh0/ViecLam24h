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

export function SignupForm({
  ...props
}) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className='text-center font-bold'>Đăng ký tài khoản</CardTitle>
        <CardDescription className='text-center'>
          Chào mừng bạn đến với việc làm 24h 👋
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="fullName">Họ và tên</FieldLabel>
              <Input id="name" type="text" placeholder="Nguyễn Văn A" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="username">Tên đăng nhập</FieldLabel>
              <Input id="username" type="text" placeholder="nguyenvana123" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" placeholder="nguyenvana123@gmail.com" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
              <Input id="password" type="password" required />
              <FieldDescription>
                Mật khẩu có độ dài tối thiểu 6 ký tự
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Nhập lại mật khẩu
              </FieldLabel>
              <Input id="confirm-password" type="password" required />
            </Field>
            <Field>
              <FieldLabel>
                Loại tài khoản
              </FieldLabel>
              <NativeSelect>
                <NativeSelectOption value="uv">Ứng viên</NativeSelectOption>
                <NativeSelectOption value="ntd">Nhà tuyển dụng</NativeSelectOption>
            </NativeSelect>
            </Field>
            <FieldGroup>
              <Field>
                <Button variant="ghost" className='bg-green-800 text-white cursor-pointer' type="submit">Tạo tài khoản</Button>
                <Button variant="outline" type="button">
                  <IconGoogle />Đăng ký với Google
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
