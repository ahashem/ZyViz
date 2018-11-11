import crossfilter from '../../components/crossfilter/crossfilter';
import NormalizeData from '../../views/shared/visualizer-data-structure/data-normalizer';
import mockOrdersJSON from './mock-test-orders';
import GenerateDimensions from '../../views/shared/visualizer-data-structure/dimensions-manager';

const mockOrdersCrossfilter = crossfilter(NormalizeData(mockOrdersJSON));
const mockOrdersDimensions = GenerateDimensions(mockOrdersCrossfilter);

export { mockOrdersJSON as jsonMock, mockOrdersCrossfilter as crossFilterMock, mockOrdersDimensions as dimensionsMock };
