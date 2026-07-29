import { Platform } from 'react-native';

const TUNNEL_URL = 'https://warm-icons-think.loca.lt';

const LOCAL_IP = '192.168.155.112';

export const API_URL = Platform.OS === 'web'
  ? 'http://localhost:5000/v1/usuarios'  // Web usa localhost directo
  : `${TUNNEL_URL}/v1/usuarios`;          // Móvil usa el tunnel público

export const TUNNEL_HEADERS = {
  'bypass-tunnel-reminder': '1',
  'Content-Type': 'application/json',
  'Authorization': 'Basic YWRtaW46MTIzNA==',
};