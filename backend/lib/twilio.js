import { create } from "xmlbuilder2";

export const twimlMessage = (text) => {
    return create()
        .ele("Response")
        .ele("Message")
        .txt(text)
        .end({ prettyPrint: false });
};


