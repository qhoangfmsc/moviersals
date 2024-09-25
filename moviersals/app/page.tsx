export default function Home() {
  return (
    <video width="100%" height="300" autoPlay loop muted preload="auto">
      <source src="/VALORANTChampions2021.mp4" type="video/mp4" />
      <track
        src="/path/to/captions.vtt"
        kind="subtitles"
        srcLang="en"
        label="English"
      />
    </video>
  );
}
