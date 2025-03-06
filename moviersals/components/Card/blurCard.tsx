import { Card, CardFooter, Button, Link, Image } from "@nextui-org/react";

export default function BlurCard({
    cardData
}: {
    cardData: {
        img: string,
        leftText: string,
        rightText: string,
        href: string,
    }
}) {
    return (
        <Card
            isFooterBlurred
            radius="lg"
            className="border-none"
        >
            <Image
                alt="alt"
                className="object-cover"
                height={200}
                src={cardData.img}
                width={200}
            />
            <CardFooter className="justify-between before:bg-white/50 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <b className="text-tiny text-black">{cardData.leftText}</b>
                <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm" as={Link} href={cardData.href}>
                    {cardData.rightText}
                </Button>
            </CardFooter>
        </Card>
    );
}