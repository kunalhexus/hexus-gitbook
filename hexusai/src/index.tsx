import {
  createComponent,
  createIntegration,
  RuntimeContext,
  RuntimeEnvironment
} from '@gitbook/runtime';
import { extractFlowId } from './hexus';


interface HexusInstallationConfiguration {}

type HexusRuntimeEnvironment = RuntimeEnvironment<HexusInstallationConfiguration>;
type HexusRuntimeContext = RuntimeContext<HexusRuntimeEnvironment>;

/**
 * Component to render the block when embeding an Hexus URL.
 */
const embedBlock = createComponent<{
  flowId?: string;
  multiflowId?: string;
  url?: string;
}>({
  componentId: 'hexusai',

  async action(element, action) {
      switch (action.action) {
          case '@link.unfurl': {
              const { url } = action;
              const nodeProps = extractFlowId(url);

              return {
                  props: {
                      ...nodeProps,
                      url,
                  },
              };
          }
      }

      return element;
  },

  async render(element, context) {
      const { environment } = context;
      const { flowId, multiflowId, url } = element.props;

      if (!flowId && !multiflowId) {
          return (
              <block>
                  <card
                      title={'Hexus'}
                      onPress={{
                          action: '@ui.url.open',
                          url,
                      }}
                      icon={
                          environment.integration.urls.icon ? (
                              <image
                                  source={{
                                      url: environment.integration.urls.icon,
                                  }}
                                  aspectRatio={1}
                              />
                          ) : undefined
                      }
                  />
              </block>
          );
      }
      
      const sourceUrl = multiflowId ? `https://app.usehexus.com/multiflow/embed/${multiflowId}` : `https://app.usehexus.com/embed/${flowId}`;
      return (
          <block>
              <webframe
                  source={{
                      url: sourceUrl,
                  }}
                  aspectRatio={16/9}
              />
          </block>
      );
  },
});

export default createIntegration<HexusRuntimeContext>({
  components: [embedBlock],
});