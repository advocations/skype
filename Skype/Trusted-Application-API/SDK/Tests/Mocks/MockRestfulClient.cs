using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.SfB.PlatformService.SDK.ClientModel;
using Microsoft.SfB.PlatformService.SDK.Common;
using Newtonsoft.Json;

namespace Microsoft.SfB.PlatformService.SDK.Tests
{
    internal class MockRestfulClient : IRestfulClient
    {
        private MockResponseData MockResponseData { get; set; }

        private List<string> m_requestsProcessed = new List<string>();

        public MockRestfulClient()
        {
            string json = File.ReadAllText("Data\\MockResponseData.json");
            MockResponseData = JsonConvert.DeserializeObject<MockResponseData>(json);
        }

        public async Task<HttpResponseMessage> DeleteAsync(Uri requestUri, IDictionary<string, string> customerHeaders = null)
        {
            return await GenerateResponseAsync(requestUri, HttpMethod.Delete, null).ConfigureAwait(false);
        }

        public async Task<HttpResponseMessage> GetAsync(Uri requestUri, IDictionary<string, string> customerHeaders = null, string mediaType = "application/json", string charSet = "utf-8")
        {
            return await GenerateResponseAsync(requestUri, HttpMethod.Get, null).ConfigureAwait(false);
        }

        public async Task<HttpResponseMessage> PostAsync(Uri requestUri, HttpContent value, IDictionary<string, string> customerHeaders = null)
        {
            return await GenerateResponseAsync(requestUri, HttpMethod.Post, value).ConfigureAwait(false);
        }

        public async Task<HttpResponseMessage> PostAsync<T>(Uri requestUri, T value, System.Net.Http.Formatting.MediaTypeFormatter mediaTypeFormatter, IDictionary<string, string> customerHeaders = null) where T : class
        {
            return await GenerateResponseAsync(requestUri, HttpMethod.Post, value).ConfigureAwait(false);
        }

        public async Task<HttpResponseMessage> PutAsync(Uri requestUri, HttpContent content, IDictionary<string, string> customerHeaders = null)
        {
            return await GenerateResponseAsync(requestUri, HttpMethod.Put, content).ConfigureAwait(false);
        }

        public async Task<HttpResponseMessage> PutAsync<T>(Uri requestUri, T value, System.Net.Http.Formatting.MediaTypeFormatter mediaTypeFormatter, IDictionary<string, string> customerHeaders = null) where T : class
        {
            return await GenerateResponseAsync(requestUri, HttpMethod.Put, value).ConfigureAwait(false);
        }

        private async Task<HttpResponseMessage> GenerateResponseAsync(Uri uri, HttpMethod method, object input)
        {
            m_requestsProcessed.Add(method.ToString() + " " + uri.ToString());
            await TaskHelpers.CompletedTask.ConfigureAwait(false);

            ResourceData resource = MockResponseData.FindResponse(uri, method);
            if (resource == null)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound);
            }

            var response = new HttpResponseMessage(resource.ResponseCode);
            if (!string.IsNullOrWhiteSpace(resource.Content))
            {
                string jsonContent = File.ReadAllText("Data\\" + resource.Content);

                if (!TestHelper.IsInternalApp)
                {
                    jsonContent = jsonContent.Replace(Constants.DefaultResourceNamespace, Constants.PublicServiceResourceNamespace);
                }

                response.Content = new StringContent(jsonContent);
                response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            }

            if(resource.Headers != null && resource.Headers.Count != 0)
            {
                foreach(var kvpair in resource.Headers)
                {
                    response.Headers.Add(kvpair.Key, kvpair.Value);
                }
            }

            HandleRequestProcessed?.Invoke(this, new RequestProcessedEventArgs(uri, method, input, response));
            return response;
        }

        public event EventHandler<RequestProcessedEventArgs> HandleRequestProcessed;

        public bool RequestsProcessed(params string[] methodAndUri)
        {
            if(methodAndUri.Length == 0)
            {
                return true;
            }

            var i = 0;
            foreach(var request in m_requestsProcessed)
            {
                if(request == methodAndUri[i])
                {
                    if(i == methodAndUri.Length - 1)
                    {
                        return true;
                    }
                    ++i;
                }
            }

            return false;
        }

        public void OverrideResponse(Uri uri, HttpMethod method, HttpStatusCode responseCode, string content)
        {
            var response = MockResponseData.FindResponse(uri, method);
            if(response == null)
            {
                response = new ResourceData()
                {
                    Uri = uri,
                    Method = method.ToString()
                };

                MockResponseData.ResponseData.Add(response);
            }

            response.ResponseCode = responseCode;
            response.Content = content;
        }

    }

    public class RequestProcessedEventArgs
    {
        public Uri Uri { get; private set; }

        public HttpMethod Method { get; private set; }

        public HttpResponseMessage Response { get; private set; }

        public object Input { get; private set; }

        public RequestProcessedEventArgs(Uri uri, HttpMethod method, object input, HttpResponseMessage response)
        {
            Uri = uri;
            Method = method;
            Input = input;
            Response = response;
        }
    }
}
