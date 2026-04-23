import { useEffect, useRef, useState } from 'react';

const MapplsMap = ({ center, zoom, vehicles, onVehicleClick }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markers = useRef({});
  const [error, setError] = useState(null);

  useEffect(() => {
    let checkCount = 0;
    const initMap = () => {
      const M = window.mappls || window.Mappls;
      
      if (M) {
        try {
          console.log('Initializing Mappls Map...');
          mapInstance.current = new M.Map('mappls-map', {
            center: center ? { lat: center[0], lng: center[1] } : { lat: 20.5937, lng: 78.9629 },
            zoom: zoom || 5,
            zoomControl: false,
            hybrid: true
          });

          mapInstance.current.addListener('load', () => {
            console.log('Mappls Map Loaded successfully');
          });

          mapInstance.current.addListener('error', (err) => {
            console.error('Mappls Map Error:', err);
            setError('Map failed to load tiles. Check API key whitelisting.');
          });
        } catch (e) {
          console.error('Mappls Initialization Exception:', e);
          setError('Failed to initialize map object.');
        }
      } else if (checkCount < 15) {
        checkCount++;
        setTimeout(initMap, 1000);
      } else {
        setError('Mappls SDK not found. Check network or script tag.');
      }
    };

    initMap();

    return () => {
      if (mapInstance.current) {
        // Cleanup logic
      }
    };
  }, []);

  useEffect(() => {
    const M = window.mappls || window.Mappls;
    if (!mapInstance.current || !M) return;

    vehicles.forEach(v => {
      try {
        if (markers.current[v.id]) {
          markers.current[v.id].setPosition({ lat: v.lat, lng: v.lng });
        } else {
          const marker = new M.Marker({
              map: mapInstance.current,
              position: { lat: v.lat, lng: v.lng },
              icon: v.status === 'delayed' ? 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' : 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
              width: 25,
              height: 40,
              popupHtml: `<div style="padding:10px; color:#000; font-family:sans-serif;">
                            <strong style="color:#000">${v.vehicle}</strong><br/>
                            <span style="color:#666">Status: ${v.status}</span>
                          </div>`
          });
          
          marker.addListener('click', () => onVehicleClick(v.id));
          markers.current[v.id] = marker;
        }
      } catch (e) {
        console.error('Error adding/updating marker:', e);
      }
    });
  }, [vehicles]);

  if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#050810] text-on-surface p-6 text-center">
        <span className="material-symbols-outlined text-error text-4xl mb-3">map_error</span>
        <p className="text-sm font-medium mb-2">{error}</p>
        <p className="text-xs text-outline">Please ensure your API Key is whitelisted for localhost in Mappls Console.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-brand text-white rounded-lg text-xs font-bold"
        >
          Retry Load
        </button>
      </div>
    );
  }

  return (
    <div 
      id="mappls-map"
      className="w-full h-full bg-[#050810] border border-white/5" 
      style={{ minHeight: '400px' }}
    />
  );
};

export default MapplsMap;
