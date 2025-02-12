import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Language = 'en' | 'he';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: Record<Language, Record<string, string>> = {
    en: {
      // Navigation
      'nav.home': 'Home',
      'nav.gallery': 'Gallery',
      'nav.contact': 'Contact',
      'nav.admin': 'Admin',
      'nav.login': 'Login',
      'nav.logout': 'Logout',

      // Home Page - Hero Section
      'home.hero.title': 'Welcome to Yaara Buda Art Gallery',
      'home.hero.subtitle': 'Discover a unique collection of contemporary Israeli art that bridges tradition and innovation',
      'home.hero.cta': 'Explore Gallery',

      // Home Page - Featured Works
      'home.featured.title': 'Featured Works',
      'home.featured.viewDetails': 'View Details',
      'home.featured.error': 'Unable to load featured artworks. Please try again later.',

      // Home Page - About Artist
      'home.about.title': 'About Yaara Buda',
      'home.about.description': 'Yaara Buda is a contemporary Israeli artist known for her unique approach to combining traditional techniques with modern perspectives. Her work explores themes of identity, memory, and cultural heritage through various mediums including painting, sculpture, and mixed media installations.',
      'home.about.quote': 'Art is a bridge between cultures, connecting past and present, tradition and innovation.',
      'home.about.contact': 'Get in Touch',

      // Home Page - Latest News
      'home.news.title': 'Latest News',
      'home.news.exhibition.title': 'New Exhibition Opening',
      'home.news.exhibition.description': 'Join us for the opening of "Reflections" - a new solo exhibition featuring recent works exploring themes of light and shadow.',
      'home.news.workshop.title': 'Artist Workshop Series',
      'home.news.workshop.description': 'Participate in our upcoming workshop series where Yaara will share her unique techniques and artistic vision.',
      'home.news.readMore': 'Read More',

      // Gallery Page
      'gallery.title': 'Art Gallery',
      'gallery.filter.all': 'All Works',
      'gallery.filter.available': 'Available Works',
      'gallery.filter.category': 'Category',
      'gallery.filter.medium': 'Medium',
      'gallery.noResults': 'No artworks found matching your criteria.',
      'gallery.loadMore': 'Load More',
      'gallery.description': 'Explore a collection of unique artworks, from paintings to commissioned pieces',
      'gallery.contactForPurchase': 'Contact for Purchase',
      'gallery.viewFullscreen': 'View Fullscreen',
      'gallery.close': 'Close',
      'gallery.price': 'Price',
      'gallery.category': 'Category',
      'gallery.loadMore': 'Load More',

      // Contact Page
      'contact.title': 'Contact Me',
      'contact.description': 'Have a question or want to work together? Send me a message and I\'ll get back to you as soon as possible.',
      'contact.email': 'Email',
      'contact.phone': 'Phone',
      'contact.hours': 'Business Hours',
      'contact.businessHours': 'Sunday - Thursday: 9:00 AM - 6:00 PM',
      
      // Contact Form
      'contact.form.name': 'Name',
      'contact.form.namePlaceholder': 'Enter your name',
      'contact.form.nameRequired': 'Please enter your name',
      'contact.form.email': 'Email',
      'contact.form.emailPlaceholder': 'Enter your email',
      'contact.form.emailInvalid': 'Please enter a valid email address',
      'contact.form.phone': 'Phone (Optional)',
      'contact.form.phonePlaceholder': 'Enter your phone number',
      'contact.form.subject': 'Subject',
      'contact.form.selectSubject': 'Select a subject',
      'contact.form.subjectArtwork': 'Artwork Purchase',
      'contact.form.subjectTattoo': 'Tattoo Design',
      'contact.form.subjectEvent': 'Event Cartoon',
      'contact.form.subjectCommission': 'Custom Commission',
      'contact.form.subjectOther': 'Other',
      'contact.form.subjectRequired': 'Please select a subject',
      'contact.form.message': 'Message',
      'contact.form.messagePlaceholder': 'Enter your message',
      'contact.form.messageRequired': 'Please enter your message',
      'contact.form.send': 'Send Message',
      'contact.form.sending': 'Sending...',
      'contact.form.success': 'Your message has been sent successfully! I\'ll get back to you soon.',
      'contact.form.error': 'Failed to send message. Please try again later.',

      // Services Section
      'services.title': 'My Services',
      'services.description': 'Discover a range of artistic services tailored to your unique vision',
      'services.contact': 'Contact Me',
      
      // Tattoo Service
      'services.tattoo.title': 'Tattoo Sketch Consulting',
      'services.tattoo.description': 'Transform your ideas into stunning tattoo designs with professional artistic guidance',
      'services.tattoo.features': 'Personal consultation to understand your vision|Custom sketch development|Multiple revisions to perfect the design|High-resolution files for your tattoo artist|Style and placement recommendations',
      
      // Events Service
      'services.events.title': 'Event Cartoons',
      'services.events.description': 'Add a unique artistic touch to your special events with custom cartoon illustrations',
      'services.events.features': 'Perfect for weddings, bar/bat mitzvahs, and corporate events|Live drawing sessions available|Digital and physical artwork options|Personalized character designs|Memorable keepsakes for guests',
      
      // Commissions Service
      'services.commissions.title': 'Custom Art Commissions',
      'services.commissions.description': 'Commission unique artwork created specifically for you or your space',
      'services.commissions.features': 'Wide range of styles and mediums|Detailed consultation process|Progress updates throughout creation|Custom framing options|Worldwide shipping available',
    },
    he: {
      // Navigation
      'nav.home': 'דף הבית',
      'nav.gallery': 'גלריה',
      'nav.contact': 'צור קשר',
      'nav.admin': 'ניהול',
      'nav.login': 'כניסה',
      'nav.logout': 'יציאה',

      // Home Page - Hero Section
      'home.hero.title': 'ברוכים הבאים לגלריית יערה בודה',
      'home.hero.subtitle': 'גלו אוסף ייחודי של אמנות ישראלית עכשווית המגשרת בין מסורת וחדשנות',
      'home.hero.cta': 'לגלריה',

      // Home Page - Featured Works
      'home.featured.title': 'עבודות נבחרות',
      'home.featured.viewDetails': 'לפרטים נוספים',
      'home.featured.error': 'לא ניתן לטעון את העבודות הנבחרות. אנא נסו שוב מאוחר יותר.',

      // Home Page - About Artist
      'home.about.title': 'על יערה בודה',
      'home.about.description': 'יערה בודה היא אמנית ישראלית עכשווית הידועה בגישתה הייחודית לשילוב טכניקות מסורתיות עם פרספקטיבות מודרניות. עבודתה חוקרת נושאים של זהות, זיכרון ומורשת תרבותית באמצעות מדיות שונות כולל ציור, פיסול ומיצבים.',
      'home.about.quote': 'אמנות היא גשר בין תרבויות, המחבר בין עבר להווה, מסורת וחדשנות.',
      'home.about.contact': 'צרו קשר',

      // Home Page - Latest News
      'home.news.title': 'חדשות ועדכונים',
      'home.news.exhibition.title': 'פתיחת תערוכה חדשה',
      'home.news.exhibition.description': 'הצטרפו אלינו לפתיחת "השתקפויות" - תערוכת יחיד חדשה המציגה עבודות חדשות העוסקות בנושאי אור וצל.',
      'home.news.workshop.title': 'סדרת סדנאות אמן',
      'home.news.workshop.description': 'השתתפו בסדרת הסדנאות הקרובה שבה תשתף יערה את הטכניקות הייחודיות שלה וחזונה האמנותי.',
      'home.news.readMore': 'קרא עוד',

      // Gallery Page
      'gallery.title': 'גלריית אמנות',
      'gallery.filter.all': 'כל העבודות',
      'gallery.filter.available': 'עבודות זמינות',
      'gallery.filter.category': 'קטגוריה',
      'gallery.filter.medium': 'טכניקה',
      'gallery.noResults': 'לא נמצאו עבודות התואמות את החיפוש שלך.',
      'gallery.loadMore': 'טען עוד',
      'gallery.description': 'גלו אוסף של יצירות אמנות ייחודיות, מציורים ועד עבודות מוזמנות',
      'gallery.contactForPurchase': 'צור קשר לרכישה',
      'gallery.viewFullscreen': 'צפייה במסך מלא',
      'gallery.close': 'סגור',
      'gallery.price': 'מחיר',
      'gallery.category': 'קטגוריה',
      'gallery.loadMore': 'טען עוד',

      // Contact Page
      'contact.title': 'צור קשר',
      'contact.description': 'יש לך שאלה או רוצה לעבוד ביחד? שלח לי הודעה ואחזור אליך בהקדם האפשרי.',
      'contact.email': 'אימייל',
      'contact.phone': 'טלפון',
      'contact.hours': 'שעות פעילות',
      'contact.businessHours': 'ראשון - חמישי: 9:00 - 18:00',
      
      // Contact Form
      'contact.form.name': 'שם',
      'contact.form.namePlaceholder': 'הכנס את שמך',
      'contact.form.nameRequired': 'אנא הכנס את שמך',
      'contact.form.email': 'אימייל',
      'contact.form.emailPlaceholder': 'הכנס את האימייל שלך',
      'contact.form.emailInvalid': 'אנא הכנס כתובת אימייל תקינה',
      'contact.form.phone': 'טלפון (אופציונלי)',
      'contact.form.phonePlaceholder': 'הכנס את מספר הטלפון שלך',
      'contact.form.subject': 'נושא',
      'contact.form.selectSubject': 'בחר נושא',
      'contact.form.subjectArtwork': 'רכישת יצירת אמנות',
      'contact.form.subjectTattoo': 'עיצוב קעקוע',
      'contact.form.subjectEvent': 'קריקטורה לאירוע',
      'contact.form.subjectCommission': 'הזמנה מותאמת אישית',
      'contact.form.subjectOther': 'אחר',
      'contact.form.subjectRequired': 'אנא בחר נושא',
      'contact.form.message': 'הודעה',
      'contact.form.messagePlaceholder': 'הכנס את הודעתך',
      'contact.form.messageRequired': 'אנא הכנס את הודעתך',
      'contact.form.send': 'שלח הודעה',
      'contact.form.sending': 'שולח...',
      'contact.form.success': 'הודעתך נשלחה בהצלחה! אחזור אליך בקרוב.',
      'contact.form.error': 'שליחת ההודעה נכשלה. אנא נסה שוב מאוחר יותר.',

      // Services Section
      'services.title': 'השירותים שלי',
      'services.description': 'גלו מגוון שירותי אמנות המותאמים לחזון הייחודי שלכם',
      'services.contact': 'צור קשר',
      
      // Tattoo Service
      'services.tattoo.title': 'ייעוץ ועיצוב קעקועים',
      'services.tattoo.description': 'הפכו את הרעיונות שלכם לעיצובי קעקועים מרהיבים עם הדרכה אמנותית מקצועית',
      'services.tattoo.features': 'ייעוץ אישי להבנת החזון שלכם|פיתוח סקיצה מותאמת אישית|מספר תיקונים לשיפור העיצוב|קבצים באיכות גבוהה למקעקע שלכם|המלצות לסגנון ומיקום',
      
      // Events Service
      'services.events.title': 'קריקטורות לאירועים',
      'services.events.description': 'הוסיפו נגיעה אמנותית ייחודית לאירועים המיוחדים שלכם עם איורי קריקטורות מותאמים אישית',
      'services.events.features': 'מושלם לחתונות, בר/בת מצווה ואירועי חברה|אפשרות לציור חי באירוע|אפשרויות לאמנות דיגיטלית ופיזית|עיצובי דמויות מותאמים אישית|מזכרות מיוחדות לאורחים',
      
      // Commissions Service
      'services.commissions.title': 'הזמנת יצירות אמנות',
      'services.commissions.description': 'הזמינו יצירת אמנות ייחודית שנוצרה במיוחד עבורכם או עבור החלל שלכם',
      'services.commissions.features': 'מגוון רחב של סגנונות וטכניקות|תהליך ייעוץ מפורט|עדכוני התקדמות לאורך היצירה|אפשרויות מסגור מותאמות אישית|משלוח לכל העולם',
    }
  };

  private currentLang = new BehaviorSubject<Language>('en');
  currentLang$ = this.currentLang.asObservable();

  constructor() {
    // Try to load saved language preference
    const savedLang = localStorage.getItem('preferred_language') as Language;
    if (savedLang) {
      this.currentLang.next(savedLang);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('he')) {
        this.setLanguage('he');
      }
    }
  }

  setLanguage(lang: Language) {
    this.currentLang.next(lang);
    localStorage.setItem('preferred_language', lang);
    document.documentElement.dir = this.isRtl() ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }

  getCurrentLang(): Language {
    return this.currentLang.value;
  }

  isRtl(): boolean {
    return this.currentLang.value === 'he';
  }

  translate(key: string): string {
    const translations = this.translations[this.currentLang.value];
    const translation = translations[key];
    
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    
    return translation;
  }
}
