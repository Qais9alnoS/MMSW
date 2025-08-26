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
  const [showTermsModal, setShowTermsModal] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Submit enrollment data to backend
      const enrollmentData = {
        ...formData,
        submittedAt: new Date().toISOString(),
        status: 'pending',
      };

      // In a real app, use the API service
      // await enrollmentApi.submitEnrollment(enrollmentData);
      
      // For now, simulate API call
      console.log('Submitting enrollment:', enrollmentData);
      
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
    } catch (error) {
      console.error('Error submitting enrollment:', error);
      toast({
        title: t('errorTitle'),
        description: t('errorMessage'),
        variant: 'destructive',
      });
    }
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
                        <SelectItem value="kg3">{t('kg3')}</SelectItem>
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
                    {language === 'ar' ? (
                      <>
                        أوافق على <button type="button" className="text-primary underline hover:text-primary/80" onClick={() => setShowTermsModal(true)}>الشروط والأحكام وسياسة الخصوصية</button> *
                      </>
                    ) : (
                      <>
                        I agree to the enrollment <button type="button" className="text-primary underline hover:text-primary/80" onClick={() => setShowTermsModal(true)}>terms and conditions and privacy policy</button> *
                      </>
                    )}
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

      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-primary font-cairo">
                {language === 'ar' ? 'الشروط والأحكام' : 'Terms and Conditions'}
              </h3>
              <button
                type="button"
                onClick={() => setShowTermsModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4 text-sm leading-relaxed">
              {language === 'ar' ? (
                <div className="text-right font-cairo">
                  <p className="mb-4"><strong>1-</strong> يلتزم ولي أمر الطالب بتحقيق الغاية المرجوة من تسجيله في المدرسة، وبمتابعة دراسته وسلوكه الحسن.</p>
                  <p className="mb-4"><strong>2-</strong> يقر ولي أمر الطالب بأنه اطلع على الأنظمة الداخلية والتعليمات والبرامج التربوية والأنشطة المعتمدة في المدرسة ووافق عليها.</p>
                  <p className="mb-4"><strong>3-</strong> يلتزم ولي أمر الطالب بدفع كامل الأقساط المدرسية عن ابنه مهما كانت الأسباب التي تدعو لتغيب الطالب أو انسحابه من المدرسة، أو لأي سبب كان، ولا يعفى من دفع كامل الأقساط المدرسية مهما كانت المبررات.</p>
                  <p className="mb-4"><strong>4-</strong> يحق للمدرسة إعادة تسجيل الطالب في حال عدم التزام ولي الأمر بدفع الأقساط المدرسية في مواعيدها المحددة.</p>
                  <p className="mb-4"><strong>5-</strong> يقر ولي أمر الطالب بتحمل تبعات أي تلف يحدثه ابنه داخل المنشأة التعليمية سواء كان متعمداً أم بغير قصد.</p>
                  
                  <p className="mb-4"><strong>6-</strong> يلتزم الطرف الثاني بدفع كامل الأقساط المدرسية خلال العام الدراسي، وفي حال انسحاب الطالب يكون رد الأقساط وفق ما يلي:</p>
                  <div className="mr-8 space-y-2">
                    <p><strong>أ-</strong> يعاد كامل القسط للطالب قبل شهر من تاريخ بدء العام الدراسي.</p>
                    <p><strong>ب-</strong> يعاد نصف القسط للطالب إذا انسحب خلال الأسبوع الأول من دوام المدرسة.</p>
                    <p><strong>ج-</strong> لا يعاد أي جزء من القسط إذا انقطع الطالب عن المدرسة بعد مرور أكثر من أسبوع على دوام المدرسة.</p>
                    <p><strong>د-</strong> لا يعاد أي جزء من القسط إذا فصل الطالب من المؤسسة بسبب مخالفته الأنظمة بشكل مفصل.</p>
                    <p><strong>هـ-</strong> يحق للطرف الأول (المدرسة) حسم جميع الاستحقاقات المالية المترتبة على ولي الأمر (كالكتب والقرطاسية واللباس المدرسي والنقل، وأي خدمات إضافية) من القسط السنوي المتفق عليه.</p>
                  </div>
                  
                  <p className="mb-4"><strong>7-</strong> يلتزم الطرف الثاني بدفع الأقساط المدرسية والأجور التعليمية الأخرى وفق اللائحة الداخلية للمدرسة.</p>
                  <p className="mb-4"><strong>8-</strong> لا يحق لولي الأمر استرداد الأقساط الخاصة للعام الدراسي التالي إلا بعد تقديم طلب خطي قبل شهر من انتهاء العام الدراسي.</p>
                  <p className="mb-4"><strong>9-</strong> يمنع منعاً باتاً المطالبة بنقل التلميذ في حال الانتقال إلى مؤسسة تعليمية خاصة أخرى إلى حين استكمال ما عليهم من التزامات مالية.</p>
                  <p className="mb-4"><strong>10-</strong> الإقرار بالالتزام والموافقة على ما ورد في بنود هذا العقد ولا يحق للطرفين المراجعة عما ورد فيه أمام أي جهة رسمية.</p>
                </div>
              ) : (
                <div>
                  <p className="mb-4"><strong>1-</strong> The student's guardian commits to achieving the intended purpose of enrolling the student in the school, and to following up on their studies and good conduct.</p>
                  <p className="mb-4"><strong>2-</strong> The student's guardian acknowledges that they have reviewed the internal regulations, instructions, educational programs, and approved activities in the school and agreed to them.</p>
                  <p className="mb-4"><strong>3-</strong> The student's guardian commits to paying full school fees for their child regardless of the reasons for the student's absence or withdrawal from school, or for any reason whatsoever, and is not exempt from paying full school fees regardless of justifications.</p>
                  <p className="mb-4"><strong>4-</strong> The school has the right to re-register the student in case the guardian fails to pay school fees within their specified deadlines.</p>
                  <p className="mb-4"><strong>5-</strong> The student's guardian acknowledges bearing responsibility for any damage caused by their child within the educational facility whether intentional or unintentional.</p>
                  
                  <p className="mb-4"><strong>6-</strong> The second party commits to paying full school fees during the academic year, and in case of student withdrawal, refunds will be processed as follows:</p>
                  <div className="ml-8 space-y-2">
                    <p><strong>a-</strong> Full fee refund to the student one month before the start of the academic year.</p>
                    <p><strong>b-</strong> Half fee refund to the student if withdrawn within the first week of school attendance.</p>
                    <p><strong>c-</strong> No portion of the fee will be refunded if the student discontinues after more than one week of school attendance.</p>
                    <p><strong>d-</strong> No portion of the fee will be refunded if the student is dismissed from the institution due to violation of regulations in detail.</p>
                    <p><strong>e-</strong> The first party (school) has the right to deduct all financial obligations owed by the guardian (such as books, stationery, school uniform, transportation, and any additional services) from the agreed annual fee.</p>
                  </div>
                  
                  <p className="mb-4"><strong>7-</strong> The second party commits to paying school fees and other educational charges according to the school's internal regulations.</p>
                  <p className="mb-4"><strong>8-</strong> The guardian does not have the right to refund fees for the next academic year unless a written request is submitted one month before the end of the academic year.</p>
                  <p className="mb-4"><strong>9-</strong> Absolutely prohibited from requesting student transfer when moving to another private educational institution until all financial obligations are completed.</p>
                  <p className="mb-4"><strong>10-</strong> Acknowledgment of commitment and agreement to all terms in this contract, and neither party has the right to review what is stated before any official authority.</p>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button
                type="button"
                onClick={() => setShowTermsModal(false)}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                {language === 'ar' ? 'إغلاق' : 'Close'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enrollment;