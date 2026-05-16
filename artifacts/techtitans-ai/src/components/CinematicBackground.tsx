import { useEffect, useRef } from "react";

export function CinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const particles: {
      x: number; y: number; vx: number; vy: number;
      radius: number; opacity: number; pulse: number; pulseSpeed: number;
    }[] = [];

    const lines: {
      x: number; y: number; length: number; angle: number;
      speed: number; opacity: number; width: number;
    }[] = [];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    for (let i = 0; i < 12; i++) {
      lines.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 120 + 40,
        angle: Math.random() * Math.PI,
        speed: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.12 + 0.03,
        width: Math.random() * 0.8 + 0.2,
      });
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      // Draw lines
      lines.forEach((line) => {
        line.x += Math.cos(line.angle) * line.speed;
        line.y += Math.sin(line.angle) * line.speed;

        if (line.x < -200) line.x = width + 200;
        if (line.x > width + 200) line.x = -200;
        if (line.y < -200) line.y = height + 200;
        if (line.y > height + 200) line.y = -200;

        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(
          line.x + Math.cos(line.angle) * line.length,
          line.y + Math.sin(line.angle) * line.length
        );
        const grad = ctx.createLinearGradient(
          line.x, line.y,
          line.x + Math.cos(line.angle) * line.length,
          line.y + Math.sin(line.angle) * line.length
        );
        grad.addColorStop(0, `rgba(59,130,246,0)`);
        grad.addColorStop(0.5, `rgba(59,130,246,${line.opacity})`);
        grad.addColorStop(1, `rgba(34,211,238,0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = line.width;
        ctx.stroke();
      });

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const pulsedOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));
        const pulsedRadius = p.radius * (0.8 + 0.2 * Math.sin(p.pulse * 1.3));

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulsedRadius * 3);
        gradient.addColorStop(0, `rgba(147,197,253,${pulsedOpacity})`);
        gradient.addColorStop(0.5, `rgba(59,130,246,${pulsedOpacity * 0.5})`);
        gradient.addColorStop(1, `rgba(59,130,246,0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, pulsedRadius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Connect nearby particles with faint lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59,130,246,${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
}
