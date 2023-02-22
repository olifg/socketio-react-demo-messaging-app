import './snow.sass';

type SnowProps = {
    particleAmount: number;
}

export const Snow = ({ particleAmount }: SnowProps) => {
    const snow = Array(particleAmount).fill('x').map((x, i) => i).map((el, i) => {
        return <span key={i} className={'snow'} />
    })
    return (
         <>{snow}</>
    )
}