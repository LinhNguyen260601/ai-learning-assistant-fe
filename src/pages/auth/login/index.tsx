import {
  PASSWORD_FORM_RULES,
  useLoginController,
  USER_FORM_RULES,
} from '@/pages/auth/login/core'
import { hasFormErrors } from '@/utils'
import { Link } from '@tanstack/react-router'
import { Button, Form, Input } from 'antd'
import { UserRound } from 'lucide-react'

const Login = () => {
  const { form, onFinish, isPending } = useLoginController()

  return (
    <main className="bg-gray-50">
      <section className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <article className="max-w-[480px] w-full p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <header>
            <figure className="size-30 mx-auto mb-4">
              <img
                src="/logo.webp"
                alt="logo"
                className="size-full object-cover"
              />
            </figure>
            <h1 className="text-slate-900 text-center text-3xl font-semibold">
              Welcome back
            </h1>
            <p className="text-gray-500 text-center text-sm font-medium">
              Sign in to continue your journey
            </p>
          </header>

          <section>
            <h2 className="sr-only">Login form</h2>
            <Form
              form={form}
              onFinish={onFinish}
              className="mt-6 space-y-6"
              layout="vertical"
            >
              <Form.Item
                name="email"
                required
                label="Email"
                rules={USER_FORM_RULES}
              >
                <Input
                  placeholder="example@gmail.com"
                  suffix={<UserRound size={14} className="text-[#00000073]" />}
                />
              </Form.Item>

              <Form.Item
                name="password"
                required
                label="Password"
                rules={PASSWORD_FORM_RULES}
              >
                <Input.Password placeholder="********" />
              </Form.Item>

              <Form.Item shouldUpdate>
                {() => (
                  <Button
                    htmlType="submit"
                    type="primary"
                    size="large"
                    className="w-full mt-3"
                    disabled={hasFormErrors(form) || isPending}
                    loading={isPending}
                  >
                    Sign in
                  </Button>
                )}
              </Form.Item>
              <p className="text-slate-900 text-sm text-center">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-blue-700 hover:text-blue-800 hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  Register here
                </Link>
              </p>
            </Form>
          </section>
        </article>
      </section>
    </main>
  )
}

export default Login
