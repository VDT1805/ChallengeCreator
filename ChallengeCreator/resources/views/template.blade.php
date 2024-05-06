<!DOCTYPE html>
<html>
        <!-- Linking to CDN -->
        <script id="MathJax-script" async src=
        "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
            </script>

            <!-- Configuration of math jax -->
            <script>
                MathJax = {
                    tex: {
                        inlineMath: [['$', '$'],
                                    ['\\(', '\\)']]
                    },
                    svg: {
                        fontCache: 'global'
                    }
                };
            </script>
	<head>
		<meta charset="utf-8" />
		<title>{{$test->name}}</title>
		<style></style>
	</head>

	<body>
        @foreach ($questions_bag as $questions)
            @include('exampdf', ['test' => $test ,'questions' => $questions])
        @endforeach
	</body>
</html>

