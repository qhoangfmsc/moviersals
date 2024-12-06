"use client"

import Transition from "@/components/MotionFramer/transition";
import { title } from "@/components/primitives";
import { staticPageData } from "@/config/staticPageData";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";

const data = staticPageData;

export default function AboutPage() {
  return (
    <Transition>
      <div className="w-full text-center mb-10">
        <h1 className={title()}>Giới thiệu</h1>
      </div>
      <div className="flex flex-col px-4">
        <div className="flex w-full flex-col">
          <Tabs className="ml-10" aria-label="Options" isVertical={true}>
            {data.map((item) => (
              <Tab className="min-w-[250px] w-full" key={item.id} title={item.title}>
                <Card className="ml-5 mr-10">
                  <CardBody className="p-10">
                    {item.body}
                  </CardBody>
                </Card>
              </Tab>
            ))}
          </Tabs>
        </div>
      </div>
    </Transition>
  );
}
