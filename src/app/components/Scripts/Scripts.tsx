import GAScript from './GAScript/GAScript';
import GTMScript from './GTMScript/GTMScript';
import KakaoShareScript from './KakaoShareScript/KakaoShareScript';
import MSClarityScript from './MSClarityScript/MSClarityScript';

export default function Scripts() {
  return (
    <>
      <GAScript />
      <GTMScript />
      <MSClarityScript />
      <KakaoShareScript />
    </>
  );
}
