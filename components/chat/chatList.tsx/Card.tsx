import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Chip, Button} from "@heroui/react";
import { HandMetal, MessageCircleCode } from "lucide-react";


const language = [
    'php','django','c#','Typescript'
]

export default function CardChat() {
  return (
    <Card className="w-full">
      <CardHeader className="flex gap-3">
        <Image
          alt="heroui logo"
          height={30}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={30}
        />
        <div className="flex flex-col">
          <p className="text-sm">HeroUI</p>
          <p className="text-small text-default-500">heroui.com</p>
        </div>
        <div className="flex-1 flex justify-end">
            <Button isIconOnly variant="solid" radius="full" size="sm" className="w-14" color="primary" startContent={<MessageCircleCode />}></Button>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="text-sm text-right ">من یه فول استک فری لنسرم که بیش از ۱۴ سال
        تجربه کار دارم و مدرک Irqc دارم.</p>
      </CardBody>
      <Divider />
      <CardFooter className="flex gap-4">
        {language.map((item,index)=>{
            return(
                <Chip variant="faded" color="default" key={index} className="text-stone-100 font-extralight">{item}</Chip>
            )
        })}
      </CardFooter>
    </Card>
  );
}
