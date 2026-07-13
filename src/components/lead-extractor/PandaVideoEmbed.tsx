export function PandaVideoEmbed() {
  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
      <iframe
        id="panda-1913d7df-7527-4767-849b-79fcb018bad8"
        src="https://player-vz-36d798a8-547.tv.pandavideo.com.br/embed/?v=1913d7df-7527-4767-849b-79fcb018bad8"
        style={{ border: "none", position: "absolute", inset: 0 }}
        allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
        allowFullScreen
        width="100%"
        height="100%"
      />
    </div>
  );
}
