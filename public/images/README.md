# SPELL 홈페이지 영상 v43

사용자가 제공한 `SPELL-homepage-v43.zip`의 원본 파일을 홈페이지의 `public/images/`에 포함합니다. Google Drive 보기 주소를 영상 재생 주소로 사용하지 않습니다.

## 현재 사용하는 파일

- `/images/SPELL-homepage-v43.webm`: WebM 지원 브라우저에서 우선 사용하는 영상.
- `/images/SPELL-homepage-v43.mp4`: MP4 대체 영상 및 다운로드 링크.
- `/images/SPELL-homepage-v43-poster.jpg`: 재생 전 포스터.

패키지 안내 기준 89.7초 / 1280×720 / 30fps / 무음입니다. 원본 파일은 변환하지 않습니다.

## 홈페이지 적용

`src/components/home/intro-video.tsx`가 위 세 파일을 직접 참조합니다. 파일과 컴포넌트를 함께 홈페이지 서버에 배포해야 적용됩니다. 버전이 포함된 새 파일명을 사용해 기존 영상 캐시와 구분합니다.

- 16:9 비율, `object-fit: contain`으로 영상 전체를 표시합니다.
- 음소거, 모바일 인라인 재생, 재생 컨트롤과 `preload="metadata"`를 유지합니다.
- 기존 자동재생을 유지하되, 모션 감소 설정 사용자는 자동재생하지 않습니다.
- 엔딩이 있는 영상이므로 자동 반복하지 않습니다.
- 이전 버전 파일은 보존합니다.

배포 후 홈페이지의 영상·포스터 경로와 MP4/WebM 응답 및 브라우저 재생을 확인하세요.
