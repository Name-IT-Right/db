import { Validation } from "@name-it-right/types";
import { rawDB } from "../../../../db";

export const NotebookInstanceName = rawDB["AWS::SageMaker::NotebookInstance"].properties.NotebookInstanceName.validation as Validation;