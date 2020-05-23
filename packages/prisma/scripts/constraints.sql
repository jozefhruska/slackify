ALTER TABLE public."PlainTextComponentData" DROP CONSTRAINT "PlainTextComponentData_componentId_fkey";

ALTER TABLE public."PlainTextComponentData" ADD CONSTRAINT "PlainTextComponentData_componentId_fkey"
    FOREIGN KEY ("componentId")
    REFERENCES public."Component"("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE public."ArticleComponentData" DROP CONSTRAINT "ArticleComponentData_componentId_fkey";

ALTER TABLE public."ArticleComponentData" ADD CONSTRAINT "ArticleComponentData_componentId_fkey"
    FOREIGN KEY ("componentId")
    REFERENCES public."Component"("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE public."LinkComponentData" DROP CONSTRAINT "LinkComponentData_componentId_fkey";

ALTER TABLE public."LinkComponentData" ADD CONSTRAINT "LinkComponentData_componentId_fkey"
    FOREIGN KEY ("componentId")
    REFERENCES public."Component"("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE public."StatRecord" DROP CONSTRAINT "StatRecord_componentId_fkey";

ALTER TABLE public."StatRecord" ADD CONSTRAINT "StatRecord_componentId_fkey"
    FOREIGN KEY ("componentId")
    REFERENCES public."Component"("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE;