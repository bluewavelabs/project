import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Phone, Mail, Key } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';

interface SignUpProps {
  onNavigate: (screen: string, data?: any) => void;
  t: any;
}

type SignUpStep = 'phone' | 'phone-verify' | 'email' | 'email-verify' | 'profile' | 'compliment-code' | 'complete';

export function SignUp({ onNavigate, t }: SignUpProps) {
  const [currentStep, setCurrentStep] = useState<SignUpStep>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneOTP, setPhoneOTP] = useState('');
  const [email, setEmail] = useState('');
  const [emailOTP, setEmailOTP] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [complimentCode, setComplimentCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [otpTimer, setOtpTimer] = useState(180); // 3 minutes

  const handleSendPhoneOTP = () => {
    // Mock sending OTP
    setCurrentStep('phone-verify');
    // Start timer
    const interval = setInterval(() => {
      setOtpTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyPhone = () => {
    // Mock verification
    if (phoneOTP.length === 6) {
      setCurrentStep('email');
    }
  };

  const handleSendEmailOTP = () => {
    // Mock sending OTP
    setCurrentStep('email-verify');
    setOtpTimer(180);
  };

  const handleVerifyEmail = () => {
    // Mock verification
    if (emailOTP.length === 6) {
      setCurrentStep('profile');
    }
  };

  const handleContinueToCodeVerification = () => {
    // Move to compliment code verification
    setCurrentStep('compliment-code');
  };

  const handleVerifyComplimentCode = () => {
    // Mock verification - in real app, this would verify against a database
    // For demo purposes, let's accept any 8-character code
    if (complimentCode.length === 8) {
      // Simulate API call
      const isValidCode = true; // In real app: check if code exists and hasn't been used
      
      if (isValidCode) {
        setCodeError(false);
        setCurrentStep('complete');
        setTimeout(() => {
          onNavigate('home');
        }, 2000);
      } else {
        setCodeError(true);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStepProgress = () => {
    const steps = ['phone', 'phone-verify', 'email', 'email-verify', 'profile', 'compliment-code'];
    return ((steps.indexOf(currentStep) + 1) / steps.length) * 100;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="max-w-[375px] mx-auto flex items-center gap-3">
          <button onClick={() => {
            if (currentStep === 'phone') {
              onNavigate('login');
            } else if (currentStep === 'phone-verify') {
              setCurrentStep('phone');
            } else if (currentStep === 'email') {
              setCurrentStep('phone-verify');
            } else if (currentStep === 'email-verify') {
              setCurrentStep('email');
            } else if (currentStep === 'profile') {
              setCurrentStep('email-verify');
            } else if (currentStep === 'compliment-code') {
              setCurrentStep('profile');
            }
          }}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1>{t.auth.signUp}</h1>
            <div className="w-full bg-white/30 rounded-full h-1 mt-2">
              <div 
                className="bg-white h-1 rounded-full transition-all duration-300"
                style={{ width: `${getStepProgress()}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <Card className="max-w-[375px] mx-auto p-6">
          {/* Step 1: Phone Number */}
          {currentStep === 'phone' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h2 className="mb-2">{t.auth.enterPhoneNumber}</h2>
                <p className="text-muted-foreground">
                  {t.auth.phoneVerificationDesc}
                </p>
              </div>

              <div>
                <Label htmlFor="signup-phone">{t.auth.phoneNumber}</Label>
                <Input
                  id="signup-phone"
                  type="tel"
                  placeholder={t.auth.phonePlaceholder}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mt-1"
                />
              </div>

              <Button
                onClick={handleSendPhoneOTP}
                disabled={phoneNumber.length < 10}
                className="w-full bg-primary hover:bg-[#2563EB] text-primary-foreground h-12 rounded-xl"
              >
                {t.auth.sendVerificationCode}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 2: Phone Verification */}
          {currentStep === 'phone-verify' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h2 className="mb-2">{t.auth.verifyPhoneNumber}</h2>
                <p className="text-muted-foreground">
                  {t.auth.otpSentTo} {phoneNumber}
                </p>
              </div>

              <div>
                <Label>{t.auth.verificationCode}</Label>
                <div className="flex justify-center mt-2">
                  <InputOTP
                    maxLength={6}
                    value={phoneOTP}
                    onChange={(value) => setPhoneOTP(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              <div className="text-center text-muted-foreground">
                <p>{t.auth.codeExpiresIn} {formatTime(otpTimer)}</p>
              </div>

              <Button
                onClick={handleVerifyPhone}
                disabled={phoneOTP.length !== 6}
                className="w-full bg-primary hover:bg-[#2563EB] text-primary-foreground h-12 rounded-xl"
              >
                {t.auth.verify}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <button
                onClick={handleSendPhoneOTP}
                className="w-full text-primary"
              >
                {t.auth.resendCode}
              </button>
            </div>
          )}

          {/* Step 3: Email */}
          {currentStep === 'email' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h2 className="mb-2">{t.auth.enterEmail}</h2>
                <p className="text-muted-foreground">
                  {t.auth.emailVerificationDesc}
                </p>
              </div>

              <div>
                <Label htmlFor="signup-email">{t.auth.email}</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder={t.auth.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>

              <Button
                onClick={handleSendEmailOTP}
                disabled={!email.includes('@')}
                className="w-full bg-primary hover:bg-[#2563EB] text-primary-foreground h-12 rounded-xl"
              >
                {t.auth.sendVerificationCode}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 4: Email Verification */}
          {currentStep === 'email-verify' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h2 className="mb-2">{t.auth.verifyEmail}</h2>
                <p className="text-muted-foreground">
                  {t.auth.otpSentToEmail} {email}
                </p>
              </div>

              <div>
                <Label>{t.auth.verificationCode}</Label>
                <div className="flex justify-center mt-2">
                  <InputOTP
                    maxLength={6}
                    value={emailOTP}
                    onChange={(value) => setEmailOTP(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              <div className="text-center text-muted-foreground">
                <p>{t.auth.codeExpiresIn} {formatTime(otpTimer)}</p>
              </div>

              <Button
                onClick={handleVerifyEmail}
                disabled={emailOTP.length !== 6}
                className="w-full bg-primary hover:bg-[#2563EB] text-primary-foreground h-12 rounded-xl"
              >
                {t.auth.verify}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <button
                onClick={handleSendEmailOTP}
                className="w-full text-primary"
              >
                {t.auth.resendCode}
              </button>
            </div>
          )}

          {/* Step 5: Complete Profile */}
          {currentStep === 'profile' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="mb-2">{t.auth.completeProfile}</h2>
                <p className="text-muted-foreground">
                  {t.auth.almostDone}
                </p>
              </div>

              <div>
                <Label htmlFor="signup-name">{t.auth.name}</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder={t.auth.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="signup-password">{t.auth.password}</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder={t.auth.passwordPlaceholder}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="signup-confirm-password">{t.auth.confirmPassword}</Label>
                <Input
                  id="signup-confirm-password"
                  type="password"
                  placeholder={t.auth.confirmPasswordPlaceholder}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1"
                />
              </div>

              {password && confirmPassword && password !== confirmPassword && (
                <p className="text-red-500">{t.auth.passwordMismatch}</p>
              )}

              <Button
                onClick={handleContinueToCodeVerification}
                disabled={!name || !password || password !== confirmPassword}
                className="w-full bg-primary hover:bg-[#2563EB] text-primary-foreground h-12 rounded-xl"
              >
                {t.auth.continue}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 6: Compliment Code Verification */}
          {currentStep === 'compliment-code' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Key className="w-8 h-8 text-accent" />
                </div>
                <h2 className="mb-2">{t.auth.enterComplimentCode}</h2>
                <p className="text-muted-foreground">
                  {t.auth.complimentCodeDesc}
                </p>
              </div>

              <div>
                <Label htmlFor="compliment-code">{t.auth.complimentCode}</Label>
                <Input
                  id="compliment-code"
                  type="text"
                  placeholder={t.auth.complimentCodePlaceholder}
                  value={complimentCode}
                  onChange={(e) => {
                    setComplimentCode(e.target.value.toUpperCase());
                    setCodeError(false);
                  }}
                  className={`mt-1 uppercase ${codeError ? 'border-red-500' : ''}`}
                  maxLength={8}
                />
                {codeError && (
                  <p className="text-red-500 mt-1">{t.auth.invalidComplimentCode}</p>
                )}
              </div>

              <div className="bg-muted rounded-lg p-4">
                <div className="flex gap-2 mb-2">
                  <div className="w-1 h-1 rounded-full bg-primary mt-2"></div>
                  <p className="text-muted-foreground">{t.auth.complimentCodeInfo1}</p>
                </div>
                <div className="flex gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary mt-2"></div>
                  <p className="text-muted-foreground">{t.auth.complimentCodeInfo2}</p>
                </div>
              </div>

              <Button
                onClick={handleVerifyComplimentCode}
                disabled={complimentCode.length !== 8}
                className="w-full bg-primary hover:bg-[#2563EB] text-primary-foreground h-12 rounded-xl"
              >
                {t.auth.verifyAndCreateAccount}
                <Check className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 7: Complete */}
          {currentStep === 'complete' && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="mb-2">{t.auth.accountCreated}</h2>
              <p className="text-muted-foreground">
                {t.auth.welcomeToWhaledone}
              </p>
            </div>
          )}
        </Card>

        {/* Sign In Link */}
        {currentStep !== 'complete' && (
          <div className="mt-6 text-center">
            <span className="text-muted-foreground">{t.auth.haveAccount} </span>
            <button
              onClick={() => onNavigate('login')}
              className="text-primary"
            >
              {t.auth.signInLink}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}