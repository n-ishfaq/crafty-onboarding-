import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Upload, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface FormData {
  // Page 1 - Business Info
  legalBusinessName: string;
  industry: string;
  email: string;
  phone: string;
  preferredContactMethod: string;
  address: string;
  facebook: string;
  facebookPassword: string;
  instagram: string;
  instagramPassword: string;
  gmail: string;
  gmailPassword: string;
  mainContactName: string;
  role: string;
  contactPhone: string;
  contactEmail: string;
  logo: File | null;
  calendarEmail: string;
  calendarPassword: string;
  domainProvider: string;
  domainUsername: string;
  domainPassword: string;
  emailProvider: string;
  crmPlatform: string;
  crmLoginUrl: string;
  crmUsername: string;
  crmPassword: string;
  billingContactName: string;
  
  // Page 2 - Business Insights
  mainService: string;
  benefits: string;
  uniqueValue: string;
  guarantees: string;
  customerPainPoints: string;
  targetCustomerDescription: string;
  idealClients: string;
  customerTitles: string;
  partnershipValue: string;
  clientServices: string;
  companySize: string;
  additionalInfo: string;
  prospectQuestions: string;
}

const OnboardingForm = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    legalBusinessName: '',
    industry: '',
    email: '',
    phone: '',
    preferredContactMethod: '',
    address: '',
    facebook: '',
    facebookPassword: '',
    instagram: '',
    instagramPassword: '',
    gmail: '',
    gmailPassword: '',
    mainContactName: '',
    role: '',
    contactPhone: '',
    contactEmail: '',
    logo: null,
    calendarEmail: '',
    calendarPassword: '',
    domainProvider: '',
    domainUsername: '',
    domainPassword: '',
    emailProvider: '',
    crmPlatform: '',
    crmLoginUrl: '',
    crmUsername: '',
    crmPassword: '',
    billingContactName: '',
    mainService: '',
    benefits: '',
    uniqueValue: '',
    guarantees: '',
    customerPainPoints: '',
    targetCustomerDescription: '',
    idealClients: '',
    customerTitles: '',
    partnershipValue: '',
    clientServices: '',
    companySize: '',
    additionalInfo: '',
    prospectQuestions: '',
  });

  const handleInputChange = (field: keyof FormData, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleInputChange('logo', file);
  };

  const nextPage = () => {
    setCurrentPage(2);
  };

  const prevPage = () => {
    setCurrentPage(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let logoUrl: string | null = null;
    if (formData.logo) {
      // Upload logo to Supabase Storage (bucket: 'logos')
      const fileExt = formData.logo.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage.from('logos').upload(fileName, formData.logo);
      if (uploadError) {
        alert('Logo upload failed: ' + uploadError.message);
        return;
      }
      const { data: publicUrlData } = supabase.storage.from('logos').getPublicUrl(fileName);
      logoUrl = publicUrlData.publicUrl;
    }

    // Map camelCase to snake_case for Supabase
    const payload = {
      legal_business_name: formData.legalBusinessName,
      industry: formData.industry || null,
      email: formData.email,
      phone: formData.phone || null,
      preferred_contact_method: formData.preferredContactMethod || null,
      address: formData.address || null,
      facebook: formData.facebook || null,
      facebook_password: formData.facebookPassword || null,
      instagram: formData.instagram || null,
      instagram_password: formData.instagramPassword || null,
      gmail: formData.gmail || null,
      gmail_password: formData.gmailPassword || null,
      main_contact_name: formData.mainContactName || null,
      role: formData.role || null,
      contact_phone: formData.contactPhone || null,
      contact_email: formData.contactEmail || null,
      logo_url: logoUrl,
      calendar_email: formData.calendarEmail || null,
      calendar_password: formData.calendarPassword || null,
      domain_provider: formData.domainProvider || null,
      domain_username: formData.domainUsername || null,
      domain_password: formData.domainPassword || null,
      email_provider: formData.emailProvider || null,
      crm_platform: formData.crmPlatform || null,
      crm_login_url: formData.crmLoginUrl || null,
      crm_username: formData.crmUsername || null,
      crm_password: formData.crmPassword || null,
      billing_contact_name: formData.billingContactName || null,
      main_service: formData.mainService || null,
      benefits: formData.benefits || null,
      unique_value: formData.uniqueValue || null,
      guarantees: formData.guarantees || null,
      customer_pain_points: formData.customerPainPoints || null,
      target_customer_description: formData.targetCustomerDescription || null,
      ideal_clients: formData.idealClients || null,
      customer_titles: formData.customerTitles || null,
      partnership_value: formData.partnershipValue || null,
      client_services: formData.clientServices || null,
      company_size: formData.companySize || null,
      additional_info: formData.additionalInfo || null,
      prospect_questions: formData.prospectQuestions || null,
    };

    const { error } = await supabase.from('onboarding_forms').insert([payload]);
    if (error) {
      alert('Submission failed: ' + error.message);
    } else {
      alert('Onboarding completed! We will contact you soon.');
      setFormData({
        legalBusinessName: '', industry: '', email: '', phone: '', preferredContactMethod: '', address: '', facebook: '', facebookPassword: '', instagram: '', instagramPassword: '', gmail: '', gmailPassword: '', mainContactName: '', role: '', contactPhone: '', contactEmail: '', logo: null, calendarEmail: '', calendarPassword: '', domainProvider: '', domainUsername: '', domainPassword: '', emailProvider: '', crmPlatform: '', crmLoginUrl: '', crmUsername: '', crmPassword: '', billingContactName: '', mainService: '', benefits: '', uniqueValue: '', guarantees: '', customerPainPoints: '', targetCustomerDescription: '', idealClients: '', customerTitles: '', partnershipValue: '', clientServices: '', companySize: '', additionalInfo: '', prospectQuestions: ''
      });
      setCurrentPage(1);
    }
  };

  const progress = currentPage === 1 ? 50 : 100;

  return (
    <div className="min-h-screen bg-gradient-dark p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-purple-primary mr-2" />
            <h1 className="text-4xl font-bold bg-gradient-purple-cyan bg-clip-text text-transparent">
              Crafty Automation
            </h1>
          </div>
          <p className="text-foreground/80 text-lg">
            Welcome to your AI automation journey
          </p>
          <div className="mt-6 max-w-md mx-auto">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              Step {currentPage} of 2
            </p>
          </div>
        </div>

        {/* Form Card */}
        <Card className="backdrop-blur-md bg-card/80 border-border/30 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl">
              {currentPage === 1 ? 'Business Information' : 'Business Insights'}
            </CardTitle>
            <CardDescription>
              {currentPage === 1 
                ? 'Tell us about your business and contact details'
                : 'Help us understand your business better'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {currentPage === 1 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="legalBusinessName">Legal Business Name *</Label>
                      <Input
                        id="legalBusinessName"
                        value={formData.legalBusinessName}
                        onChange={(e) => handleInputChange('legalBusinessName', e.target.value)}
                        className="bg-input/50 border-border/50"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry *</Label>
                      <Select onValueChange={(value) => handleInputChange('industry', value)}>
                        <SelectTrigger className="bg-input/50 border-border/50">
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="consulting">Consulting</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-input/50 border-border/50"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="bg-input/50 border-border/50"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferredContactMethod">Preferred Contact Method</Label>
                      <Select onValueChange={(value) => handleInputChange('preferredContactMethod', value)}>
                        <SelectTrigger className="bg-input/50 border-border/50">
                          <SelectValue placeholder="Select contact method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                          <SelectItem value="text">Text Message</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="bg-input/50 border-border/50"
                      />
                    </div>
                  </div>

                  <div className="border-t border-border/30 pt-6">
                    <h3 className="text-lg font-semibold mb-4 text-primary">Main Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="mainContactName">Main Contact Name</Label>
                        <Input
                          id="mainContactName"
                          value={formData.mainContactName}
                          onChange={(e) => handleInputChange('mainContactName', e.target.value)}
                          className="bg-input/50 border-border/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Input
                          id="role"
                          value={formData.role}
                          onChange={(e) => handleInputChange('role', e.target.value)}
                          className="bg-input/50 border-border/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contactPhone">Phone</Label>
                        <Input
                          id="contactPhone"
                          type="tel"
                          value={formData.contactPhone}
                          onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                          className="bg-input/50 border-border/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contactEmail">Email</Label>
                        <Input
                          id="contactEmail"
                          type="email"
                          value={formData.contactEmail}
                          onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                          className="bg-input/50 border-border/50"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border/30 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="logo">Logo Upload</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="logo"
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="bg-input/50 border-border/50"
                          />
                          <Upload className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="billingContactName">Billing Contact Name</Label>
                        <Input
                          id="billingContactName"
                          value={formData.billingContactName}
                          onChange={(e) => handleInputChange('billingContactName', e.target.value)}
                          className="bg-input/50 border-border/50"
                        />
                      </div>

                    </div>
                  </div>

                  <div className="border-t border-border/30 pt-6">
                    <h3 className="text-lg font-semibold mb-4 text-primary">Appointment and Calendars</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="calendarEmail">Calendly/Google Calendar Email</Label>
                        <Input
                          id="calendarEmail"
                          type="email"
                          value={formData.calendarEmail}
                          onChange={(e) => handleInputChange('calendarEmail', e.target.value)}
                          className="bg-input/50 border-border/50"
                          placeholder="Calendar email address"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="calendarPassword">Password</Label>
                        <Input
                          id="calendarPassword"
                          type="password"
                          value={formData.calendarPassword}
                          onChange={(e) => handleInputChange('calendarPassword', e.target.value)}
                          className="bg-input/50 border-border/50"
                          placeholder="Calendar password"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border/30 pt-6">
                    <h3 className="text-lg font-semibold mb-4 text-primary">Domain & Email Provider Credentials</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="domainProvider">Domain Provider</Label>
                        <Input
                          id="domainProvider"
                          value={formData.domainProvider}
                          onChange={(e) => handleInputChange('domainProvider', e.target.value)}
                          className="bg-input/50 border-border/50"
                          placeholder="Godaddy, NameCheap etc"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="domainUsername">Domain Login Username</Label>
                        <Input
                          id="domainUsername"
                          value={formData.domainUsername}
                          onChange={(e) => handleInputChange('domainUsername', e.target.value)}
                          className="bg-input/50 border-border/50"
                          placeholder="Domain login username"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="domainPassword">Domain Login Password</Label>
                        <Input
                          id="domainPassword"
                          type="password"
                          value={formData.domainPassword}
                          onChange={(e) => handleInputChange('domainPassword', e.target.value)}
                          className="bg-input/50 border-border/50"
                          placeholder="Domain login password"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="emailProvider">Email Provider</Label>
                        <Input
                          id="emailProvider"
                          value={formData.emailProvider}
                          onChange={(e) => handleInputChange('emailProvider', e.target.value)}
                          className="bg-input/50 border-border/50"
                          placeholder="Gmail, Outlook etc."
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="crmPlatform">CRM Platform</Label>
                        <Select onValueChange={(value) => handleInputChange('crmPlatform', value)}>
                          <SelectTrigger className="bg-input/50 border-border/50">
                            <SelectValue placeholder="Select CRM Platform" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="salesforce">Salesforce</SelectItem>
                            <SelectItem value="hubspot">HubSpot</SelectItem>
                            <SelectItem value="pipedrive">Pipedrive</SelectItem>
                            <SelectItem value="zoho">Zoho CRM</SelectItem>
                            <SelectItem value="monday">Monday.com</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="crmLoginUrl">CRM Login URL</Label>
                        <Input
                          id="crmLoginUrl"
                          value={formData.crmLoginUrl}
                          onChange={(e) => handleInputChange('crmLoginUrl', e.target.value)}
                          className="bg-input/50 border-border/50"
                          placeholder="CRM login URL"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="crmUsername">CRM Login Username</Label>
                        <Input
                          id="crmUsername"
                          value={formData.crmUsername}
                          onChange={(e) => handleInputChange('crmUsername', e.target.value)}
                          className="bg-input/50 border-border/50"
                          placeholder="CRM username"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="crmPassword">CRM Password</Label>
                        <Input
                          id="crmPassword"
                          type="password"
                          value={formData.crmPassword}
                          onChange={(e) => handleInputChange('crmPassword', e.target.value)}
                          className="bg-input/50 border-border/50"
                          placeholder="CRM password"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      type="button" 
                      onClick={nextPage}
                      className="bg-gradient-purple-cyan hover:opacity-90 text-white font-semibold px-8"
                    >
                      Next Step
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="mainService">Walk me through your main service. What exactly do you do and who do you serve?</Label>
                      <Textarea
                        id="mainService"
                        value={formData.mainService}
                        onChange={(e) => handleInputChange('mainService', e.target.value)}
                        className="bg-input/50 border-border/50 min-h-[100px]"
                        placeholder="Describe your main service and target audience..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="benefits">What are the benefits of your offer?</Label>
                      <Textarea
                        id="benefits"
                        value={formData.benefits}
                        onChange={(e) => handleInputChange('benefits', e.target.value)}
                        className="bg-input/50 border-border/50 min-h-[100px]"
                        placeholder="List the key benefits your clients receive..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="uniqueValue">What sets you apart and makes you stand out from your competitors?</Label>
                      <Textarea
                        id="uniqueValue"
                        value={formData.uniqueValue}
                        onChange={(e) => handleInputChange('uniqueValue', e.target.value)}
                        className="bg-input/50 border-border/50 min-h-[100px]"
                        placeholder="Describe your unique value proposition..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="guarantees">Do you offer any guarantees?</Label>
                      <Textarea
                        id="guarantees"
                        value={formData.guarantees}
                        onChange={(e) => handleInputChange('guarantees', e.target.value)}
                        className="bg-input/50 border-border/50"
                        placeholder="Describe any guarantees you offer..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customerPainPoints">What are the biggest pain points of your ideal customer?</Label>
                      <Textarea
                        id="customerPainPoints"
                        value={formData.customerPainPoints}
                        onChange={(e) => handleInputChange('customerPainPoints', e.target.value)}
                        className="bg-input/50 border-border/50 min-h-[100px]"
                        placeholder="List the main problems your ideal customers face..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="targetCustomerDescription">Give us a one description of who you sell your products and service to.</Label>
                      <Textarea
                        id="targetCustomerDescription"
                        value={formData.targetCustomerDescription}
                        onChange={(e) => handleInputChange('targetCustomerDescription', e.target.value)}
                        className="bg-input/50 border-border/50 min-h-[100px]"
                        placeholder="Describe your ideal customer profile..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="idealClients">Please provide a bullet list of five distinct companies you'd consider to be ideal clients.</Label>
                      <Textarea
                        id="idealClients"
                        value={formData.idealClients}
                        onChange={(e) => handleInputChange('idealClients', e.target.value)}
                        className="bg-input/50 border-border/50 min-h-[100px]"
                        placeholder="• Company 1&#10;• Company 2&#10;• Company 3&#10;• Company 4&#10;• Company 5"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customerTitles">Give us some titles that your ideal customer has.</Label>
                      <Textarea
                        id="customerTitles"
                        value={formData.customerTitles}
                        onChange={(e) => handleInputChange('customerTitles', e.target.value)}
                        className="bg-input/50 border-border/50"
                        placeholder="CEO, Marketing Director, Operations Manager, etc..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="partnershipValue">What would a strong partnership or connection be worth to you annually?</Label>
                      <Input
                        id="partnershipValue"
                        value={formData.partnershipValue}
                        onChange={(e) => handleInputChange('partnershipValue', e.target.value)}
                        className="bg-input/50 border-border/50"
                        placeholder="$50,000, $100,000, etc..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="clientServices">Who else's service do your ideal clients buy? (to identify referral sources and upsell opportunities)</Label>
                      <Textarea
                        id="clientServices"
                        value={formData.clientServices}
                        onChange={(e) => handleInputChange('clientServices', e.target.value)}
                        className="bg-input/50 border-border/50"
                        placeholder="List other services your clients typically purchase..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="companySize">What is the company size of your ideal clients? For example, 1,000 employees.</Label>
                      <Input
                        id="companySize"
                        value={formData.companySize}
                        onChange={(e) => handleInputChange('companySize', e.target.value)}
                        className="bg-input/50 border-border/50"
                        placeholder="10-50 employees, 100-500 employees, etc..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="additionalInfo">Is there anything we should know about your ideal clients?</Label>
                      <Textarea
                        id="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                        className="bg-input/50 border-border/50"
                        placeholder="Any additional insights about your ideal clients..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="prospectQuestions">Can you think of any questions that your prospects would likely respond to? Imagine a scenario where you would be making a cold call to them — what kind of questions would you ask?</Label>
                      <Textarea
                        id="prospectQuestions"
                        value={formData.prospectQuestions}
                        onChange={(e) => handleInputChange('prospectQuestions', e.target.value)}
                        className="bg-input/50 border-border/50 min-h-[100px]"
                        placeholder="List effective questions for prospect engagement..."
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      onClick={prevPage}
                      variant="outline"
                      className="border-border/50 hover:bg-secondary/50"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                    <Button 
                      type="submit"
                      className="bg-gradient-purple-cyan hover:opacity-90 text-white font-semibold px-8"
                    >
                      Complete Onboarding
                      <Sparkles className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingForm;