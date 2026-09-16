# SPELL 홈페이지 영상 — 최종 확정 v41

2026-09-15 교수님 최종 승인본. **v40 대신 이 패키지의 v41 파일로 홈페이지를 업데이트하세요.**

## 파일

- `SPELL-homepage-v41.mp4`: 기본 업로드 영상. H.264 Baseline / yuv420p / faststart.
- `SPELL-homepage-v41.webm`: 선택 제공 영상. VP9.
- `SPELL-homepage-v41-poster.jpg`: 재생 전 포스터.
- `README.md`: 학생 적용 안내.

89.7초 / 1280×720 / 30fps / 무음. 음악 없음. 원본 해상도 유지.

## v40에서 최종 변경된 내용

- 멤리스티브 펄스와 가중치 변화는 처음부터 끝까지 0.8초 간격.
- 펄스·소자 전도도·선택된 배열 셀의 변화는 같은 시간 기준 사용.
- Programming pulses / Synaptic weight / Weight array를 세 단계처럼 강조하던 하단 표시 제거.
- 디프레션 업데이트 3회가 남은 시점에 기존 시간대로 AI 장면 전환 시작.
- 실촬영 컷, LED, 증착, 태양전지, AI, 엔딩 로고 타이밍 및 전체 길이는 v40 그대로.

## 홈페이지 적용

1. MP4와 JPG를 홈페이지 서버/CMS에 업로드하세요. WebM은 선택 사항입니다.
2. 기존 영상과 포스터 주소를 v41 주소로 교체하세요. Google Drive 미리보기 URL은 직접 영상 소스가 아닙니다.
3. 홈페이지/CDN 캐시를 갱신한 뒤 데스크톱과 iPhone/Android에서 확인하세요.

```html
<video controls muted playsinline preload="metadata"
       poster="/media/SPELL-homepage-v41-poster.jpg"
       style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:contain;background:#07111f">
  <source src="/media/SPELL-homepage-v41.webm" type="video/webm">
  <source src="/media/SPELL-homepage-v41.mp4" type="video/mp4">
  <a href="/media/SPELL-homepage-v41.mp4">영상 다운로드</a>
</video>
```

경로는 실제 업로드 주소로 바꾸세요. WebM을 올리지 않으면 WebM source 줄을 삭제하세요. 자동재생이 필요하면 autoplay를 추가하되 muted·playsinline과 수동 재생 버튼을 유지하세요. 모션 감소 설정 사용자에게는 자동재생 없이 포스터·재생 버튼을 제공합니다.

이 영상은 타이틀과 설명이 포함된 소개 본편입니다. 짧은 무자막 seamless loop가 아닙니다. 모바일에서 좌우를 자르는 cover 방식은 피하고 전체 16:9 화면을 보존하세요. 큰 HTML 헤드라인을 영상 위에 중복 배치하지 마세요.

## 출처·검증 범위

실촬영·생성 이미지 기반 장면·개념 애니메이션을 함께 사용했습니다. 그래프·메커니즘·AI 학습 표현은 실측 데이터나 실제 학습 로그가 아닙니다. 증착 수치는 촬영 원본을 가속한 것이며 새로 만든 값이 아닙니다. 레이징 배경 촬영본 자체를 레이징 실적의 증빙으로 사용하지 마세요.

MP4와 WebM 전체 디코딩 검사를 수행했습니다. 홈페이지 자체 배포 및 실제 휴대폰 재생 검증은 학생들이 업로드 후 확인해야 합니다. 이전 공유 파일은 보존되어 있으므로 파일명의 v41을 확인하세요.
