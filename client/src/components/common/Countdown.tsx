import Countdown from "react-countdown"

const CompletionList = () => (
    <div className="text-green-600 font-semibold text-lg">Time's up!</div>
)

export default function CountdownTimer({ targetDate }: { targetDate: Date }) {
    return (
        <Countdown
            date={targetDate}
            renderer={({ days, hours, minutes, seconds, completed }: any) => {
                if (completed) return <CompletionList />

                const boxClass =
                    "py-1 px-3 bg-secondary text-background flex items-center justify-center rounded-lg text-2xl font-mono shadow-md flex-col"

                return (
                    <div className="flex justify-center items-center gap-2">
                        <div className={boxClass}>
                            {String(days).padStart(2, "0")}
                            <p className="text-xs font-semibold">Days</p>
                        </div>
                        <p className="font-black">:</p>
                        <div className={boxClass}>
                            {String(hours).padStart(2, "0")}
                            <p className="text-xs font-semibold">Hours</p>
                        </div>
                        <p className="font-black">:</p>
                        <div className={boxClass}>
                            {String(minutes).padStart(2, "0")}
                            <p className="text-xs font-semibold">Minutes</p>
                        </div>
                        <p className="font-black">:</p>
                        <div className={boxClass}>
                            {String(seconds).padStart(2, "0")}
                            <p className="text-xs font-semibold">Seconds</p>
                        </div>
                    </div>
                )
            }}
        />
    )
}
