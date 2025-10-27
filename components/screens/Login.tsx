import { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface LoginProps {
  onNavigate: (screen: string, data?: any) => void;
  t: any;
}

export function Login({ onNavigate, t }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Mock login - in real app, this would authenticate
    onNavigate('home');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Logo/Header Section */}
      <div className="bg-primary text-primary-foreground p-6 pb-12">
        <div className="max-w-[375px] mx-auto">
          <h1 className="text-center mb-2">Whaledone</h1>
          <p className="text-center opacity-90">{t.auth.welcomeBack}</p>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 -mt-6 px-4">
        <Card className="max-w-[375px] mx-auto p-6 shadow-lg">
          {/* Email Login Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">{t.auth.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t.auth.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">{t.auth.password}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t.auth.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {/* Forgot Password */}
          <button className="text-primary mt-2 w-full text-right">
            {t.auth.forgotPassword}
          </button>

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            className="w-full mt-6 bg-primary hover:bg-[#2563EB] text-primary-foreground h-12 rounded-xl"
          >
            {t.auth.loginButton}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-muted-foreground">{t.auth.or}</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          {/* Social Login Options */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-12 rounded-xl"
              onClick={() => {/* Handle Kakao login */}}
            >
              <div className="w-5 h-5 rounded-full bg-[#FEE500] mr-2"></div>
              {t.auth.kakaoLogin}
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 rounded-xl"
              onClick={() => {/* Handle Google login */}}
            >
              <div className="w-5 h-5 rounded-full bg-white border mr-2 flex items-center justify-center">
                <div className="w-3 h-3 bg-gradient-to-br from-blue-500 via-red-500 to-yellow-500 rounded-full"></div>
              </div>
              {t.auth.googleLogin}
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 rounded-xl"
              onClick={() => {/* Handle Apple login */}}
            >
              <div className="w-5 h-5 rounded-full bg-black mr-2 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
              </div>
              {t.auth.appleLogin}
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <span className="text-muted-foreground">{t.auth.noAccount} </span>
            <button
              onClick={() => onNavigate('signup')}
              className="text-primary"
            >
              {t.auth.signUpLink}
            </button>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <div className="p-6 text-center text-muted-foreground">
        <p>{t.auth.terms}</p>
      </div>
    </div>
  );
}