import { MapPin, Star, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export default function VenueCard({ shop, onClick }) {
  return (
    <div 
      onClick={onClick}
      style={{
        background: 'white', borderRadius: '24px', padding: '20px', 
        display: 'flex', alignItems: 'center', gap: '20px', 
        marginBottom: '15px', border: '1px solid #eee', cursor: 'pointer',
        transition: 'transform 0.2s'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <div style={{width: '70px', height: '70px', borderRadius: '50%', background: '#f5f5f5', overflow: 'hidden'}}>
        <img src={shop.logo_url || SITE_CONFIG.logoPath} style={{width:'100%', height:'100%', objectFit:'cover'}} />
      </div>
      
      <div style={{flex: 1}}>
        <div style={{fontWeight: 800, fontSize: '18px', color: SITE_CONFIG.colors.fig}}>{shop.name}</div>
        <div style={{display:'flex', alignItems:'center', gap:'5px', opacity:0.6, fontSize:'13px'}}>
          <MapPin size={14} /> {shop.location}
        </div>
      </div>
      
      <ArrowRight color={SITE_CONFIG.colors.terra} />
    </div>
  );
}