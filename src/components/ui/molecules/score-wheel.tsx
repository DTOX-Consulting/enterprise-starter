import { Flat } from '@alptugidin/react-circular-progress-bar';

type Props = {
  score: number;
  sign?: string;
  maxScore?: number;
};

export const strokeColors = (score: number) => {
  /**
   * The color of the stroke is determined by the score.
   * If the score is less than 25, the color is red.
   * If the score is less than 50, the color is red-orange.
   * If the score is less than 75, the color is orange
   * Otherwise, the color is green.
   */
  const strokeColor =
    score < 25 ? '#ff0000' : score < 50 ? '#ff5000' : score < 75 ? '#ffa500' : '#00ff00';

  // Bg stroke color should be a muted version of the stroke color.
  // This is done by reducing the opacity of the stroke color.
  const bgStrokeColor = `${strokeColor}40`;

  return { strokeColor, bgStrokeColor };
};

export function ScoreWheel({ score, sign = '%', maxScore = 100 }: Props) {
  const { strokeColor, bgStrokeColor } = strokeColors(score);

  return (
    <div className="flex justify-center">
      <div className="size-16">
        <Flat
          text="Score"
          progress={score}
          showValue={true}
          showMiniCircle={false}
          range={{ from: 0, to: maxScore }}
          sign={{ value: sign, position: 'end' }}
          sx={{
            strokeColor,
            barWidth: 10,
            bgStrokeColor,
            shape: 'full',
            textSize: 22,
            valueSize: 18,
            loadingTime: 500,
            textFamily: 'Arial',
            valueFamily: 'Arial',
            strokeLinecap: 'round',
            valueAnimation: true,
            intersectionEnabled: true
          }}
        />
      </div>
    </div>
  );
}
