import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';

const Enrollment = () => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    studentName: '',
    dateOfBirth: '',
    gender: '',
    grade: '',
    parentName: '',
    email: '',
    phone: '',
    address: '',
    previousSchool: '',
    message: '',
    agreeToTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, agreeToTerms: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    
    // Show success message
    toast({
      title: t('successTitle'),
      description: t('successMessage'),
      variant: 'default',
    });
    
    // Reset form
    setFormData({
      studentName: '',
      dateOfBirth: '',
      gender: '',
      grade: '',
      parentName: '',
      email: '',
      phone: '',
      address: '',
      previousSchool: '',
      message: '',
      agreeToTerms: false,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal delay={0} origin="top" distance="60px" duration={900}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-cairo">
              {t('enrollmentTitle')}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200} origin="bottom" distance="40px" duration={800}>
            <p className="text-xl max-w-3xl mx-auto">
              {t('enrollmentHeroDesc')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Enrollment Process */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal delay={0} origin="top" distance="40px" duration={800}>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-primary mb-4 font-cairo">
                {t('enrollmentProcess')}
              </h2>
              <div className="w-24 h-1 bg-accent mx-auto"></div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-4 gap-8">
            <ScrollReveal delay={100} origin="left" distance="50px" duration={800}>
              <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-xl font-semibold text-primary mb-2 font-cairo">
                  {t('step1')}
                </h3>
                <p className="text-muted-foreground">
                  {t('step1Desc')}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200} origin="left" distance="50px" duration={800}>
              <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-xl font-semibold text-primary mb-2 font-cairo">
                  {t('step2')}
                </h3>
                <p className="text-muted-foreground">
                  {t('step2Desc')}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300} origin="right" distance="50px" duration={800}>
              <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-xl font-semibold text-primary mb-2 font-cairo">
                  {t('step3')}
                </h3>
                <p className="text-muted-foreground">
                  {t('step3Desc')}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400} origin="right" distance="50px" duration={800}>
              <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
                <h3 className="text-xl font-semibold text-primary mb-2 font-cairo">
                  {t('step4')}
                </h3>
                <p className="text-muted-foreground">
                  {t('step4Desc')}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Enrollment Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal delay={0} origin="top" distance="40px" duration={800}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4 font-cairo">
                {t('enrollmentForm')}
              </h2>
              <div className="w-24 h-1 bg-accent mx-auto"></div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={200} origin="bottom" distance="60px" duration={1000}>
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
              <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4 pt-4">
                <h3 className="text-xl font-semibold text-primary font-cairo">
                  {t('studentInfo')}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentName">
                      {t('studentName')} *
                    </Label>
                    <Input
                      id="studentName"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">
                      {t('dateOfBirth')} *
                    </Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender">
                      {t('gender')} *
                    </Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange('gender', value)}
                      value={formData.gender}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectGender')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">{t('male')}</SelectItem>
                        <SelectItem value="female">{t('female')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="grade">
                      {t('gradeLevel')} *
                    </Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange('grade', value)}
                      value={formData.grade}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectGrade')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg1">{t('kg1')}</SelectItem>
                        <SelectItem value="kg2">{t('kg2')}</SelectItem>
                        <SelectItem value="grade1">{t('grade1')}</SelectItem>
                        <SelectItem value="grade2">{t('grade2')}</SelectItem>
                        <SelectItem value="grade3">{t('grade3')}</SelectItem>
                        <SelectItem value="grade4">{t('grade4')}</SelectItem>
                        <SelectItem value="grade5">{t('grade5')}</SelectItem>
                        <SelectItem value="grade6">{t('grade6')}</SelectItem>
                        <SelectItem value="grade7">{t('grade7')}</SelectItem>
                        <SelectItem value="grade8">{t('grade8')}</SelectItem>
                        <SelectItem value="grade9">{t('grade9')}</SelectItem>
                        <SelectItem value="grade10">{t('grade10')}</SelectItem>
                        <SelectItem value="grade11">{t('grade11')}</SelectItem>
                        <SelectItem value="grade12">{t('grade12')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="previousSchool">
                    {t('previousSchool')}
                  </Label>
                  <Input
                    id="previousSchool"
                    name="previousSchool"
                    value={formData.previousSchool}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-xl font-semibold text-primary font-cairo">
                  {t('parentInfo')}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentName">
                      {t('parentName')} *
                    </Label>
                    <Input
                      id="parentName"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      {t('phoneNumber')} *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">
                    {t('emailAddress')} *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">
                    {t('address')} *
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-xl font-semibold text-primary font-cairo">
                  {t('additionalInfo')}
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="message">
                    {t('additionalNotes')}
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full h-32"
                  />
                </div>
                
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Checkbox 
                    id="terms" 
                    checked={formData.agreeToTerms}
                    onCheckedChange={handleCheckboxChange}
                    required
                  />
                  <Label htmlFor="terms" className="text-sm">
                    {t('agreeToTerms')} *
                  </Label>
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg transition-colors">
                {t('submitEnrollment')}
              </Button>
              
              <p className="text-sm text-muted-foreground text-center">
                {t('requiredFields')}
              </p>
            </form>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Tuition Fees */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4 font-cairo">
              {t('tuitionFees')}
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
            <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('tuitionFeesDesc')}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="py-4 px-6 text-left">
                    {t('gradeLevel')}
                  </th>
                  <th className="py-4 px-6 text-left">
                    {t('annualFees')}
                  </th>
                  <th className="py-4 px-6 text-left">
                    {t('registrationFee')}
                  </th>
                  <th className="py-4 px-6 text-left">
                    {t('paymentOptions')}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-muted hover:bg-muted/10 transition-colors">
                  <td className="py-4 px-6">
                    {t('kindergarten')}
                  </td>
                  <td className="py-4 px-6">$5,000</td>
                  <td className="py-4 px-6">$500</td>
                  <td className="py-4 px-6">
                    {t('paymentOptionsList')}
                  </td>
                </tr>
                <tr className="border-b border-muted hover:bg-muted/10 transition-colors">
                  <td className="py-4 px-6">
                    {t('elementarySchool')}
                  </td>
                  <td className="py-4 px-6">$7,500</td>
                  <td className="py-4 px-6">$750</td>
                  <td className="py-4 px-6">
                    {t('paymentOptionsList')}
                  </td>
                </tr>
                <tr className="border-b border-muted hover:bg-muted/10 transition-colors">
                  <td className="py-4 px-6">
                    {t('middleSchool')}
                  </td>
                  <td className="py-4 px-6">$9,000</td>
                  <td className="py-4 px-6">$900</td>
                  <td className="py-4 px-6">
                    {t('paymentOptionsList')}
                  </td>
                </tr>
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="py-4 px-6">
                    {t('highSchool')}
                  </td>
                  <td className="py-4 px-6">$12,000</td>
                  <td className="py-4 px-6">$1,200</td>
                  <td className="py-4 px-6">
                    {t('paymentOptionsList')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              {t('feesIncludeNote')}
            </p>
            <p className="text-muted-foreground">
              {t('additionalFeesNote')}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4 font-cairo">
              {t('faqTitle')}
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
          </div>

          <div className="space-y-6">
            <div className="bg-muted/10 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-primary mb-2 font-cairo">
                {t('faqDocumentsQuestion')}
              </h3>
              <p className="text-foreground/80">
                {t('faqDocumentsAnswer')}
              </p>
            </div>

            <div className="bg-muted/10 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-primary mb-2 font-cairo">
                {t('faqAdmissionTestQuestion')}
              </h3>
              <p className="text-foreground/80">
                {t('faqAdmissionTestAnswer')}
              </p>
            </div>

            <div className="bg-muted/10 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-primary mb-2 font-cairo">
                {t('faqTransportationQuestion')}
              </h3>
              <p className="text-foreground/80">
                {t('faqTransportationAnswer')}
              </p>
            </div>

            <div className="bg-muted/10 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-primary mb-2 font-cairo">
                {t('faqSiblingDiscountQuestion')}
              </h3>
              <p className="text-foreground/80">
                {t('faqSiblingDiscountAnswer')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Enrollment;