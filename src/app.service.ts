import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      name: "LoFo-Api",
      status: "Active",
      docs: "/docs",
      createdBy: "Kyynotsepuh",
      github: "https://github.com/KyyTzy09",
      timeStamp: new Date().toLocaleDateString("id-ID", {
        dateStyle: "full"
      })
    };
  }
}
