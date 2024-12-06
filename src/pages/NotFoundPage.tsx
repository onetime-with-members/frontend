import { Helmet } from 'react-helmet-async';

import notFound404 from '../assets/not-found-404.svg';
import NavBar from '../components/NavBar';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 | OneTime</title>
      </Helmet>
      <div className="flex flex-1 flex-col">
        <NavBar />
        <div className="mx-auto flex w-full max-w-screen-md flex-1 items-center justify-center">
          <div className="flex -translate-y-20 flex-col items-center gap-10">
            <div>
              <img src={notFound404} alt="404" />
            </div>
            <div className="flex flex-col items-center gap-3">
              <h1 className="text-primary-50 title-sm-300">
                요청하신 페이지를 찾을 수 없어요
              </h1>
              <p className="text-center text-gray-40 text-md-200">
                찾으시려는 페이지의 주소가 잘못되었거나
                <br />
                주소 변경, 삭제로 이용하실 수 없어요.
                <br />
                주소가 올바르게 입력되었는지 확인해주세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
