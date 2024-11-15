import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CloudFog, Loader, Wind } from "lucide-react";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getWeatherByCoordinates, getWeatherByLocation } from "@/api/weather";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setError, setWeather } from "@/store/slices/weatherSlice";

const FormSchema = z.object({
  location: z.string().min(1, { message: "Please enter the location name" }),
});

export default function Weather() {
  const dispatch = useAppDispatch();
  const weather = useAppSelector((state) => state.weather);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      location: "",
    },
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setIsLoading(true);
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          try {
            const data = await getWeatherByCoordinates(latitude, longitude);
            console.log(data, "data");
            dispatch(setWeather(data));
          } catch (error) {
            console.log(error);
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              dispatch(setError("User denied the request for Geolocation."));
              break;
            case error.POSITION_UNAVAILABLE:
              dispatch(setError("Location information is unavailable."));
              break;
            case error.TIMEOUT:
              dispatch(setError("The request to get user location timed out."));
              break;
            default:
              dispatch(setError("An unknown error occurred."));
              break;
          }
        }
      );
    } else {
      dispatch(setError("Geolocation is not supported by this browser."));
    }
  }, []);

  const handleSearchCity = (values: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    try {
      const data = getWeatherByLocation(values.location);
      dispatch(setWeather(data));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-sky-400 to-indigo-200">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-md">
          <Form {...form}>
            <form
              className="space-y-1"
              onSubmit={form.handleSubmit(handleSearchCity)}
            >
              <FormField
                name="location"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input
                          type="text"
                          id="search-input"
                          className="w-full"
                          placeholder="Search for a location"
                          {...field}
                        />
                      </FormControl>
                      <Button type="submit" size="lg">
                        Search
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
              <FormMessage>
                {form?.formState?.errors?.location?.message}
              </FormMessage>
            </form>
          </Form>
          {isLoading ? (
            <Loader className="mx-auto animate-spin" />
          ) : (
            <div className="flex flex-col items-center mt-10">
              <div className="text-6xl font-bold text-gray-800 dark:text-white mb-2">
                {weather?.weather}
              </div>
              <div className="text-gray-600 dark:text-gray-400 mb-4">Sunny</div>
              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                <CloudFog className="w-5 h-5 mr-2" />
                60%
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Wind className="w-5 h-5 mr-2" />
                10 km/h
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
