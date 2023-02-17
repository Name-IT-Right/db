import { rawDB } from "../../../../db"

export const NotebookInstanceName = rawDB["AWS::SageMaker::NotebookInstance"].properties.NotebookInstanceName.validation;