import {useRelayEnvironment} from 'react-relay/hooks';
import {useCallback, useEffect, useRef, useState} from 'react';
import {
  commitMutation,
  Disposable,
  GraphQLTaggedNode,
  MutationConfig,
  MutationParameters as DefaultParameters,
} from 'relay-runtime';

type ConfigWithouMutation<Parameters extends DefaultParameters> = Omit<MutationConfig<Parameters>, 'mutation'>;

type isPending = boolean;
type ExecuteFn<Parameters extends DefaultParameters> = (config: ConfigWithouMutation<Parameters>) => void;

type Mutation<Parameters extends DefaultParameters> = [isPending, ExecuteFn<Parameters>];

export default function useMutation<Parameters extends DefaultParameters = DefaultParameters>(
  mutation: GraphQLTaggedNode,
): Mutation<Parameters> {
  const environment = useRelayEnvironment();

  const [isPending, setPending] = useState<isPending>(false);

  const requestRef = useRef<Disposable | null>(null);
  const mountedRef = useRef(false);

  const execute: ExecuteFn<Parameters> = useCallback(
    (config: ConfigWithouMutation<Parameters> = {variables: {}}) => {
      if (requestRef.current != null) {
        return;
      }
      requestRef.current = commitMutation(environment, {
        ...config,
        onCompleted: (response, errors) => {
          if (!mountedRef.current) {
            return;
          }
          requestRef.current = null;
          setPending(false);
          config.onCompleted && config.onCompleted(response, errors);
        },
        onError: error => {
          // eslint-disable-next-line no-console
          console.error(error);
          if (!mountedRef.current) {
            return;
          }
          requestRef.current = null;
          setPending(false);
          config.onError && config.onError(error);
        },
        mutation,
      });
      setPending(true);
    },
    [mutation, environment],
  );

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return [isPending, execute];
}
